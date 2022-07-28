import { useEffect, useReducer } from "react";

const initialState = {
  isLoading: true,
  loadError: null,
  chars: [],
  words: [],
};

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
      return { ...state, chars: action.payload };
    case ACTIONS.SET_WORDS:
      return { ...state, words: action.payload };
    case ACTIONS.RESET_INFO:
      return initialState;
    default:
      return state;
  }
};

const useFetch = (isStarted, isEnded, startCountdown) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, loadError, chars, words } = state;

  const loaded = () => dispatch({ type: ACTIONS.LOADED });
  const resetTextInfo = () => dispatch({ type: ACTIONS.RESET_INFO });

  // Get data from metaphorsum API and turn on countdown timer.
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://metaphorpsum.com/paragraphs/1/1");
        const text = await response.text();
        dispatch({ type: ACTIONS.SET_CHARS, payload: text.split("") });
        dispatch({ type: ACTIONS.SET_WORDS, payload: text.split(" ") });
        loaded();
        startCountdown();
        if (!response.ok) {
          throw Error(response.statusText);
        }
      } catch (err) {
        dispatch({ type: ACTIONS.SET_LOAD_ERROR, payload: err });
        loaded();
      }
    };

    if (!isStarted && !isEnded) getData();
  }, [isStarted, isEnded]);

  return { isLoading, loadError, chars, words, resetTextInfo };
};

export default useFetch;
