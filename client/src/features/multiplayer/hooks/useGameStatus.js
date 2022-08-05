import { useReducer } from "react";

const initialState = {
  isClientReady: false,
  isClientStarted: false,
  isClientEnded: false,
};

const ACTIONS = {
  READY_CLIENT: "ready client",
  START_CLIENT: "start game",
  END_CLIENT: "end game",
  RESTART_GAME: "restart",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.READY_CLIENT:
      return { ...state, isClientReady: true };
    case ACTIONS.START_CLIENT:
      return { ...state, isClientStarted: true };
    case ACTIONS.END_CLIENT:
      return { ...state, isClientReady: false, isClientEnded: true };
    case ACTIONS.RESTART_GAME:
      return initialState;
    default:
      return state;
  }
};

const useGameStatus = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isClientReady, isClientStarted, isClientEnded } = state;

  const readyClient = () => dispatch({ type: ACTIONS.READY_CLIENT });
  const startGame = () => dispatch({ type: ACTIONS.START_GAME });
  const endGame = () => dispatch({ type: ACTIONS.END_CLIENT });
  const restartGame = () => dispatch({ type: ACTIONS.RESTART_GAME });

  return {
    isClientReady,
    isClientStarted,
    isClientEnded,
    readyClient,
    startGame,
    endGame,
    restartGame,
  };
};

export default useGameStatus;
