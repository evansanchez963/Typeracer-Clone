import { useEffect, useReducer } from "react";

const ACTIONS = {
  LOADED: "loaded",
  SET_LOAD_ERROR: "get load error",
  SET_CHARS: "get chars",
  SET_WORDS: "get words",
  RESET_INFO: "reset info",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOADED:
      return { ...state, isLoading: false };
    case ACTIONS.SET_LOAD_ERROR:
      return { ...state, loadError: action.payload };
    case ACTIONS.SET_CHARS:
      console.log(action.payload);
      return { ...state, chars: action.payload };
    case ACTIONS.SET_WORDS:
      console.log(action.payload);
      return { ...state, words: action.payload };
    case ACTIONS.RESET_INFO:
      return {
        ...state,
        isLoading: false,
        loadError: null,
        chars: [],
        words: [],
      };
    default:
      return state;
  }
};

const useFetch = (startCountdown) => {
  const info = {
    isLoading: true,
    loadError: null,
    chars: [],
    words: [],
  };

  const [state, dispatch] = useReducer(reducer, info);

  const isLoading = state.isLoading;
  const loadError = state.loadError;
  const chars = state.chars;
  const words = state.words;
  const setChars = (text) =>
    dispatch({ type: ACTIONS.SET_CHARS, payload: text.split("") });
  const setWords = (text) =>
    dispatch({ type: ACTIONS.SET_WORDS, payload: text.split(" ") });
  const loaded = () => dispatch({ type: ACTIONS.LOADED });

  // Get data from metaphorsum API and turn on countdown timer.
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://metaphorpsum.com/paragraphs/1/1");
        const text = await response.text();
        setChars(text);
        setWords(text);
        loaded();
        startCountdown();
        if (!response.ok) {
          console.log("Error!");
          throw Error(response.statusText);
        }
      } catch (err) {
        dispatch({ type: ACTIONS.SET_LOAD_ERROR, payload: err });
        loaded();
      }
    };

    getData();
  }, []);

  return { isLoading, loadError, chars, words };
};

export default useFetch;
