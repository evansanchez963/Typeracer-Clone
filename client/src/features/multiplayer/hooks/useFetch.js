/*
import { useReducer, useEffect, useCallback } from "react";
import { useSocket } from "../../../context/SocketContext";
import getTextData from "../../../services/gameServices";

const initialState = {
  isFetchData: false,
  isLoading: true,
  loadError: null,
  chars: [],
  words: [],
};

const ACTIONS = {
  SET_FETCH_DATA: "set fetch data",
  LOADED: "loaded",
  SET_LOAD_ERROR: "get load error",
  SET_CHARS: "get chars",
  SET_WORDS: "get words",
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
    case ACTIONS.SET_CHARS:
      return { ...state, chars: action.payload };
    case ACTIONS.SET_WORDS:
      return { ...state, words: action.payload };
    case ACTIONS.RESET_INFO:
      return {
        ...state,
        isLoading: true,
        loadError: null,
        chars: [],
        words: [],
      };
    default:
      return state;
  }
};

const useFetch = (userRoster) => {
  const { socket, joinedRoomCode } = useSocket();

  const hostSocketId = Object.keys(userRoster)[0];

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isFetchData, isLoading, loadError, chars, words } = state;

  const setFetchData = () => dispatch({ type: ACTIONS.SET_FETCH_DATA });
  const loaded = () => dispatch({ type: ACTIONS.LOADED });
  const setChars = (chars) =>
    dispatch({ type: ACTIONS.SET_CHARS, payload: chars });
  const setWords = (words) =>
    dispatch({ type: ACTIONS.SET_WORDS, payload: words });
  const resetTextInfo = useCallback(
    () => dispatch({ type: ACTIONS.RESET_INFO }),
    []
  );

  // If this socket id is the first on userRoster, then this client fetches the text data
  useEffect(() => {
    if (Object.keys(userRoster)[0] === socket.id) setFetchData();
  }, [userRoster, socket]);

  // If this page has not loaded for the first client in userRoster, then fetch data
  useEffect(() => {
    const getData = async () => {
      try {
        const text = await getTextData();
        setChars(text.split(""));
        setWords(text.split(" "));
        loaded();
      } catch (err) {
        dispatch({ type: ACTIONS.SET_LOAD_ERROR, payload: err });
        loaded();
      }
    };

    if (isFetchData && isLoading) getData();
  }, [isFetchData, isLoading]);

  const recieveDataHandler = useCallback((data) => {
    setChars(data.chars);
    setWords(data.words);
    loaded();
  }, []);

  // The first client in userRoster sends text info to other clients in room
  useEffect(() => {
    socket.on("recieve_text_data", recieveDataHandler);

    if (
      chars.length !== 0 &&
      words.length !== 0 &&
      Object.keys(userRoster).length > 1 &&
      hostSocketId === socket.id
    )
      socket.emit("send_text_data", {
        room: joinedRoomCode,
        chars: chars,
        words: words,
      });

    return () => socket.off("recieve_text_data", recieveDataHandler);
  }, [
    joinedRoomCode,
    userRoster,
    hostSocketId,
    chars,
    words,
    socket,
    recieveDataHandler,
  ]);

  return { isLoading, loadError, chars, words, resetTextInfo };
};

export default useFetch;
*/
