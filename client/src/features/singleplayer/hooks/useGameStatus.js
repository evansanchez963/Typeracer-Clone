import { useReducer } from "react";

const initialState = {
  gameStatus: "not_started",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "start_game":
      return { gameStatus: "started" };
    case "end_game":
      return { gameStatus: "ended" };
    case "restart_game":
      return initialState;
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const useGameStatus = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { gameStatus } = state;
  const dispatchGameStatus = dispatch;

  return { gameStatus, dispatchGameStatus };
};

export default useGameStatus;
