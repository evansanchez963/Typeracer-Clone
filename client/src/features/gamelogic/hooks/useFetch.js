import axios from "axios";
import { useEffect, useReducer } from "react";

const ACTIONS = {
  LOADED: "loaded",
  GET_LOAD_ERROR: "get load error",
  GET_CHARS: "get chars",
  GET_WORDS: "get words",
  RESET_INFO: "reset info",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOADED:
      return { ...state, isLoading: false };
    case ACTIONS.GET_LOAD_ERROR:
      return { ...state, loadError: action.payload };
    case ACTIONS.GET_CHARS:
      return { ...state, chars: action.payload };
    case ACTIONS.GET_WORDS:
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
  const loaded = dispatch({ type: ACTIONS.LOADED });

  // Get data from metaphorsum API and turn on countdown timer.
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://metaphorpsum.com/paragraphs/1/1"
        );
        const text = await response.text();
        //setTextInfo((prev) => ({ ...prev, chars: text.split("") }));
        dispatch({ type: ACTIONS.GET_CHARS, payload: text.split("") });
        //setTextInfo((prev) => ({ ...prev, words: text.split(" ") }));
        dispatch({ type: ACTIONS.GET_WORDS, payload: text.split(" ") });
        //setLoadInfo((prev) => ({ ...prev, isLoading: false }));
        loaded();
        //setCountdown((prev) => ({ ...prev, on: true }));
        startCountdown();
        if (!response.ok) {
          throw Error(response.statusText);
        }
      } catch (err) {
        //setLoadInfo((prev) => ({ ...prev, loadError: loadError }));
        dispatch({ type: ACTIONS.GET_LOAD_ERROR, payload: err });
        //setLoadInfo((prev) => ({ ...prev, isLoading: false }));
        loaded();
      }
    };

    getData();
  }, []);

  //return { loadInfo, textInfo };
  return { isLoading, loadError, chars, words };
};

export default useFetch;
