import { useReducer } from "react";

const initialState = {
  currInput: "",
  inputValid: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_input":
      return { ...state, currInput: action.payload };
    case "add_character":
      return { ...state, currInput: state.currInput + action.payload };
    case "set_valid":
      return { ...state, inputValid: action.payload };
    case "reset_input":
      return initialState;
    default:
      return state;
  }
};

const useInput = () => {
  const [inputState, inputDispatch] = useReducer(reducer, initialState);

  return {
    inputState,
    inputDispatch,
  };
};

export default useInput;
