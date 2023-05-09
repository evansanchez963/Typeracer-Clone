import { useEffect, useReducer } from "react";

const FOUR_SECONDS = 4000;
const ONE_MINUTE_THIRTY_SECONDS = 90000;

const initialState = {
  gameStatus: "not_started",
  countdown: FOUR_SECONDS,
  gameTimer: ONE_MINUTE_THIRTY_SECONDS,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "start_game":
      return { ...state, gameStatus: "started" };
    case "end_game":
      return { ...state, gameStatus: "ended" };
    case "decrement_countdown":
      return { ...state, countdown: state.countdown - 1000 };
    case "decrement_game_timer":
      return { ...state, gameTimer: state.gameTimer - 1000 };
    case "restart_game":
      return initialState;
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const useGameStatus = () => {
  const [gameStatusState, dispatchGameStatus] = useReducer(
    reducer,
    initialState
  );

  const countdownOn = gameStatusState.countdown > 0;
  const gameTimerOn = !countdownOn && gameStatusState.gameTimer > 0;

  // Countdown from 4 seconds when first loaded into page
  useEffect(() => {
    let interval = null;

    if (countdownOn) {
      interval = setInterval(() => {
        dispatchGameStatus({ type: "decrement_countdown" });
      }, 1000);
    } else {
      clearInterval(interval);
      dispatchGameStatus({ type: "start_game" });
    }

    return () => clearInterval(interval);
  }, [countdownOn]);

  // Start game timer when countdown is over and stop
  // when it has reached 0
  useEffect(() => {
    let interval = null;

    if (gameTimerOn) {
      interval = setInterval(() => {
        dispatchGameStatus({ type: "decrement_game_timer" });
      }, 1000);
    } else {
      clearInterval(interval);
      dispatchGameStatus({ type: "end_game" });
    }

    return () => clearInterval(interval);
  }, [gameTimerOn]);

  return { gameStatusState, dispatchGameStatus };
};

export default useGameStatus;
