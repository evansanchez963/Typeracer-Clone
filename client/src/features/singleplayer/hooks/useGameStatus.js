import { useEffect, useReducer } from "react";
import getTextData from "../../../services/gameServices";

const FOUR_SECONDS = 4000;
const ONE_MINUTE_THIRTY_SECONDS = 90000;

const initialState = {
  isLoading: true,
  loadError: null,
  chars: [],
  words: [],
  gameStatus: "not_started",
  countdown: FOUR_SECONDS,
  gameTimer: ONE_MINUTE_THIRTY_SECONDS,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "page_loaded":
      return { ...state, isLoading: false };
    case "load_error":
      return { ...state, loadError: action.payload };
    case "get_characters":
      return { ...state, chars: action.payload };
    case "get_words":
      return { ...state, words: action.payload };
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
  const [gameStatusState, gameStatusDispatch] = useReducer(
    reducer,
    initialState
  );

  const countdownOn =
    !gameStatusState.isLoading &&
    gameStatusState.loadError === null &&
    gameStatusState.countdown > 0;
  const gameTimerOn = !countdownOn && gameStatusState.gameTimer > 0;

  useEffect(() => {
    const startGame = async () => {
      try {
        const text = await getTextData();
        gameStatusDispatch({ type: "get_characters", payload: text.split("") });
        gameStatusDispatch({ type: "get_words", payload: text.split(" ") });
        gameStatusDispatch({ type: "page_loaded" });
      } catch (err) {
        gameStatusDispatch({ type: "load_error", payload: err });
        gameStatusDispatch({ type: "page_loaded" });
      }
    };

    if (gameStatusState.isLoading) startGame();
  }, [gameStatusState.isLoading]);

  // Countdown from 4 seconds when first loaded into page
  useEffect(() => {
    let interval = null;

    if (countdownOn) {
      interval = setInterval(() => {
        gameStatusDispatch({ type: "decrement_countdown" });
      }, 1000);
    } else if (gameStatusState.countdown <= 0) {
      clearInterval(interval);
      gameStatusDispatch({ type: "start_game" });
    }

    return () => clearInterval(interval);
  }, [gameStatusState.countdown, countdownOn]);

  // Start game timer when countdown is over and stop when it has reached 0
  useEffect(() => {
    let interval = null;

    if (gameTimerOn) {
      interval = setInterval(() => {
        gameStatusDispatch({ type: "decrement_game_timer" });
      }, 1000);
    } else if (gameStatusState.gameTimer <= 0) {
      clearInterval(interval);
      gameStatusDispatch({ type: "end_game" });
    }

    return () => clearInterval(interval);
  }, [gameStatusState.gameTimer, gameTimerOn]);

  return { gameStatusState, gameStatusDispatch };
};

export default useGameStatus;
