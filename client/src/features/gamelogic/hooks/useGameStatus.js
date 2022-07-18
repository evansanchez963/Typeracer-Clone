import { useReducer } from "react";

const initialState = {
  isStarted: false,
  isEnded: false,
};

const ACTIONS = {
  START_GAME: "start game",
  END_GAME: "end game",
  RESTART_GAME: "restart",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.START_GAME:
      return { ...state, isStarted: true };
    case ACTIONS.END_GAME:
      return { ...state, isEnded: true };
    case ACTIONS.RESTART_GAME:
      return { ...state, isStarted: false, isEnded: false };
    default:
      return state;
  }
};

const useGameStatus = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isStarted, isEnded } = state;

  const startGame = () => dispatch({ type: ACTIONS.START_GAME });
  const endGame = () => dispatch({ type: ACTIONS.END_GAME });
  const restartGame = () => dispatch({ type: ACTIONS.RESTART_GAME });

  return { isStarted, isEnded, startGame, endGame, restartGame };
};

export default useGameStatus;
