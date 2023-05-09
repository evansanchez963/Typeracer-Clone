import { useReducer, useCallback } from "react";

const initialState = {
  charsTyped: 0,
  errors: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "increment_characters_typed":
      return { ...state, charsTyped: state.charsTyped + 1 };
    case "increment_errors":
      return { ...state, errors: state.errors + 1 };
    case "reset_type_info":
      return initialState;
    default:
      return state;
  }
};

const useTypeInfo = () => {
  const [typeInfoState, typeInfoDispatch] = useReducer(reducer, initialState);

  return { typeInfoState, typeInfoDispatch };
};

export default useTypeInfo;
