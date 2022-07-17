import { useReducer } from "react";

const ACTIONS = {
  INC_CHARS_TYPED: "increment characaters typed",
  INC_ERRORS: "increment errors",
  RESET_TYPE_INFO: "reset type info",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INC_CHARS_TYPED:
      return { ...state, charsTyped: state.charsTyped + 1 };
    case ACTIONS.INC_ERRORS:
      return { ...state, errors: state.errors + 1 };
    case ACTIONS.RESET_TYPE_INFO:
      return { ...state, charsTyped: 0, errors: 0 };
    default:
      return state;
  }
};

const useTypeInfo = () => {
  const userTypeInfo = {
    charsTyped: 0,
    errors: 0,
  };

  const [state, dispatch] = useReducer(reducer, userTypeInfo);

  const charsTyped = state.charsTyped;
  const errors = state.errors;
  const incCharsTyped = dispatch({ type: ACTIONS.INC_CHARS_TYPED });
  const incErrors = dispatch({ type: ACTIONS.INC_ERRORS });
  const resetTypeInfo = dispatch({ type: ACTIONS.RESET_TYPE_INFO });

  return { charsTyped, errors, incCharsTyped, incErrors, resetTypeInfo };
};

export default useTypeInfo;
