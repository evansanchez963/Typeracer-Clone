import { useReducer } from "react";

const initialState = {
  currCharIdx: -1,
  currWordIdx: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "increment_character_index":
      return { ...state, currCharIdx: state.currCharIdx + 1 };
    case "decrement_character_index":
      return { ...state, currCharIdx: state.currCharIdx - 1 };
    case "reset_character_index":
      return { ...state, currCharIdx: -1 };
    case "increment_word_index":
      return { ...state, currWordIdx: state.currWordIdx + 1 };
    case "reset_word_index":
      return { ...state, currWordIdx: 0 };
    case "reset_index_info":
      return initialState;
    default:
      return state;
  }
};

const useIdxInfo = () => {
  const [idxInfoState, idxInfoDispatch] = useReducer(reducer, initialState);

  return {
    idxInfoState,
    idxInfoDispatch,
  };
};

export default useIdxInfo;
