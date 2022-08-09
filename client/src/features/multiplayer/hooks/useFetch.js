import { useReducer, useEffect, useCallback } from "react";
import { useSocket } from "../../../context/SocketContext";
import axios from "axios";

const initialState = {
  isLoading: true,
  loadError: null,
  chars: [],
  words: [],
  text: "",
};

const ACTIONS = {
  LOADED: "loaded",
  SET_LOAD_ERROR: "get load error",
  SET_CHARS: "get chars",
  SET_WORDS: "get words",
  SET_TEXT: "set text",
  RESET_INFO: "reset info",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOADED:
      return { ...state, isLoading: false };
    case ACTIONS.SET_LOAD_ERROR:
      return { ...state, loadError: action.payload };
    case ACTIONS.SET_CHARS:
      return { ...state, chars: action.payload };
    case ACTIONS.SET_WORDS:
      return { ...state, words: action.payload };
    case ACTIONS.SET_TEXT:
      return { ...state, text: action.payload };
    case ACTIONS.RESET_INFO:
      return initialState;
    default:
      return state;
  }
};

const useFetch = (userRoster, roomCode) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, loadError, chars, words, text } = state;
  const socket = useSocket();

  const loaded = () => dispatch({ type: ACTIONS.LOADED });
  const setChars = (chars) =>
    dispatch({ type: ACTIONS.SET_CHARS, payload: chars });
  const setWords = (words) =>
    dispatch({ type: ACTIONS.SET_WORDS, payload: words });
  const resetTextInfo = () => dispatch({ type: ACTIONS.RESET_INFO });

  const fetchDataHandler = useCallback(async (data) => {
    if (data.fetchData) {
      try {
        console.log("Fetch text data!");
        const response = await axios.get(
          "http://metaphorpsum.com/paragraphs/1/1"
        );
        dispatch({ type: ACTIONS.SET_TEXT, payload: response.data });
        loaded();
      } catch (err) {
        dispatch({ type: ACTIONS.SET_LOAD_ERROR, payload: err });
        loaded();
      }
    } else return;
  }, []);

  const recieveDataHandler = useCallback((data) => {
    dispatch({ type: ACTIONS.SET_TEXT, payload: data.text });
    loaded();
  }, []);

  useEffect(() => {
    socket.on("fetch_text_data", fetchDataHandler);
    socket.on("recieve_text_data", recieveDataHandler);

    // If this socket id is the first one to join room or is first on the roster,
    // send text info to other clients in room.
    if (
      text !== "" &&
      Object.keys(userRoster).length > 1 &&
      Object.keys(userRoster)[0] === socket.id
    )
      socket.emit("send_text_data", { room: roomCode, text: text });

    return () => {
      socket.off("fetch_text_data", fetchDataHandler);
      socket.off("recieve_text_data", recieveDataHandler);
    };
  }, [
    roomCode,
    userRoster,
    text,
    socket,
    fetchDataHandler,
    recieveDataHandler,
  ]);

  return { isLoading, loadError, text };
};

export default useFetch;
