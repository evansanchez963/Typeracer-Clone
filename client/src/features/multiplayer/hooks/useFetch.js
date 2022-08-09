import { useReducer, useEffect, useCallback } from "react";
import { useSocket } from "../../../context/SocketContext";
import axios from "axios";

const initialState = {
  isFetchData: false,
  isLoading: true,
  loadError: null,
  //chars: [],
  //words: [],
  text: "",
};

const ACTIONS = {
  SET_FETCH_DATA: "set fetch data",
  LOADED: "loaded",
  SET_LOAD_ERROR: "get load error",
  //SET_CHARS: "get chars",
  //SET_WORDS: "get words",
  SET_TEXT: "set text",
  RESET_INFO: "reset info",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_FETCH_DATA:
      return { ...state, isFetchData: true };
    case ACTIONS.LOADED:
      return { ...state, isLoading: false };
    case ACTIONS.SET_LOAD_ERROR:
      return { ...state, loadError: action.payload };
    /*
    case ACTIONS.SET_CHARS:
      return { ...state, chars: action.payload };
    case ACTIONS.SET_WORDS:
      return { ...state, words: action.payload };
    */
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
  const { isFetchData, isLoading, loadError, text } = state;
  const socket = useSocket();

  const setFetchData = () => dispatch({ type: ACTIONS.SET_FETCH_DATA });
  const loaded = () => dispatch({ type: ACTIONS.LOADED });
  /*
  const setChars = (chars) =>
    dispatch({ type: ACTIONS.SET_CHARS, payload: chars });
  const setWords = (words) =>
    dispatch({ type: ACTIONS.SET_WORDS, payload: words });
  */
  const resetTextInfo = () => dispatch({ type: ACTIONS.RESET_INFO });

  // If this socket id of the first on userRoster, then this client fetches the text data.
  useEffect(() => {
    if (Object.keys(userRoster)[0] === socket.id) setFetchData();
  }, [userRoster, socket]);

  // If this page has not loaded for the first client in userRoster, then fetch data.
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://metaphorpsum.com/paragraphs/1/1"
        );
        dispatch({ type: ACTIONS.SET_TEXT, payload: response.data });
        loaded();
      } catch (err) {
        dispatch({ type: ACTIONS.SET_LOAD_ERROR, payload: err });
        loaded();
      }
    };

    if (isFetchData && isLoading) getData();
  }, [isFetchData, isLoading]);

  const recieveDataHandler = useCallback((data) => {
    dispatch({ type: ACTIONS.SET_TEXT, payload: data.text });
    loaded();
  }, []);

  // Send text info to other clients in room.
  useEffect(() => {
    socket.on("recieve_text_data", recieveDataHandler);

    if (
      text !== "" &&
      Object.keys(userRoster).length > 1 &&
      Object.keys(userRoster)[0] === socket.id
    )
      socket.emit("send_text_data", { room: roomCode, text: text });

    return () => socket.off("recieve_text_data", recieveDataHandler);
  }, [roomCode, userRoster, text, socket, recieveDataHandler]);

  return { isLoading, loadError, text, resetTextInfo };
};

export default useFetch;
