import { useReducer } from "react";

const ACTIONS = {
  SET_CURR_INPUT: "set curr input",
  SET_INPUT_VALID: "set input valid",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CURR_INPUT:
      return { ...state, currInput: action.payload };
    case ACTIONS.SET_INPUT_VALID:
      return { ...state, currInput: action.payload };
    default:
      return state;
  }
};

const useInput = () => {
  const inputInfo = {
    currInput: "",
    inputValid: true,
  };

  const [state, dispatch] = useReducer(reducer, inputInfo);

  const currInput = state.currInput;
  const inputValid = state.inputValid;
  const setCurrInput = (input) =>
    dispatch({ type: ACTIONS.SET_CURR_INPUT, payload: input });
  const setInputValid = (bool) =>
    dispatch({ type: ACTIONS.SET_INPUT_VALID, payload: bool });

  return { currInput, inputValid, setCurrInput, setInputValid };
};

export default useInput;
