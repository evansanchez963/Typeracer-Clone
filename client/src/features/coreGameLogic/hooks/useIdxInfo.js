import { useReducer, useCallback } from "react";

const initialState = {
  currCharIdx: -1,
  currWordIdx: 0,
};

const ACTIONS = {
  INC_CHAR_IDX: "increment char index",
  DEC_CHAR_IDX: "decrement char index",
  RESET_CHAR_IDX: "reset char index",
  INC_WORD_IDX: "increment word index",
  RESET_WORD_IDX: "reset word index",
  RESET_IDX_INFO: "reset index info",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INC_CHAR_IDX:
      return { ...state, currCharIdx: state.currCharIdx + 1 };
    case ACTIONS.DEC_CHAR_IDX:
      return { ...state, currCharIdx: state.currCharIdx - 1 };
    case ACTIONS.RESET_CHAR_IDX:
      return { ...state, currCharIdx: -1 };
    case ACTIONS.INC_WORD_IDX:
      return { ...state, currWordIdx: state.currWordIdx + 1 };
    case ACTIONS.RESET_WORD_IDX:
      return { ...state, currWordIdx: 0 };
    case ACTIONS.RESET_IDX_INFO:
      return initialState;
    default:
      return state;
  }
};

const useIdxInfo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currCharIdx, currWordIdx } = state;

  const incCharIdx = () => dispatch({ type: ACTIONS.INC_CHAR_IDX });
  const decCharIdx = () => dispatch({ type: ACTIONS.DEC_CHAR_IDX });
  const resetCharIdx = () => dispatch({ type: ACTIONS.RESET_CHAR_IDX });
  const incWordIdx = () => dispatch({ type: ACTIONS.INC_WORD_IDX });
  const resetWordIdx = () => dispatch({ type: ACTIONS.RESET_WORD_IDX });
  const resetIdxInfo = useCallback(
    () => dispatch({ type: ACTIONS.RESET_IDX_INFO }),
    []
  );

  return {
    currCharIdx,
    currWordIdx,
    incCharIdx,
    decCharIdx,
    resetCharIdx,
    incWordIdx,
    resetWordIdx,
    resetIdxInfo,
  };
};

export default useIdxInfo;
