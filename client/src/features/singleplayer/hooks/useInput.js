import { useReducer, useCallback } from "react";

const initialState = {
  currInput: "",
  inputValid: true,
};

const ACTIONS = {
  SET_CURR_INPUT: "set curr input",
  ADD_CHAR: "add char",
  SET_INPUT_VALID: "set input valid",
  RESET_INPUT: "reset input",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CURR_INPUT:
      return { ...state, currInput: action.payload };
    case ACTIONS.ADD_CHAR: {
      return { ...state, currInput: state.currInput + action.payload };
    }
    case ACTIONS.SET_INPUT_VALID:
      return { ...state, inputValid: action.payload };
    case ACTIONS.RESET_INPUT:
      return initialState;
    default:
      return state;
  }
};

const useInput = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currInput, inputValid } = state;

  const setCurrInput = useCallback(
    (input) => dispatch({ type: ACTIONS.SET_CURR_INPUT, payload: input }),
    []
  );
  const addChar = (char) => dispatch({ type: ACTIONS.ADD_CHAR, payload: char });
  const setInputValid = (bool) =>
    dispatch({ type: ACTIONS.SET_INPUT_VALID, payload: bool });
  const resetInput = () => dispatch({ type: ACTIONS.RESET_INPUT });

  return {
    currInput,
    inputValid,
    setCurrInput,
    addChar,
    setInputValid,
    resetInput,
  };
};

export default useInput;
