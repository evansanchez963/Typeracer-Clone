import { useEffect, useReducer } from "react";

const ACTIONS = {
  START_COUNTDOWN: "start countdown",
  STOP_COUNTDOWN: "stop countdown",
  DECREMENT_COUNTDOWN: "decrement countdown",
  START_GAME_TIMER: "start game timer",
  STOP_GAME_TIMER: "stop game timer",
  DECREMENT_GAME_TIMER: "decrement game timer",
  RESTART_TIMERS: "restart timers",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.START_COUNTDOWN:
      return { ...state, countdownOn: true };
    case ACTIONS.STOP_COUNTDOWN:
      return { ...state, countdownOn: false };
    case ACTIONS.DECREMENT_COUNTDOWN:
      return { ...state, countdown: state.countdown - 1000 };
    case ACTIONS.START_GAME_TIMER:
      return { ...state, gameTimerOn: true };
    case ACTIONS.STOP_GAME_TIMER:
      return { ...state, gameTimerOn: false };
    case ACTIONS.DECREMENT_GAME_TIMER:
      return { ...state, gameTimer: state.gameTimer - 1000 };
    case ACTIONS.RESTART_TIMERS:
      return {
        ...state,
        countdown: 4000,
        countdownOn: false,
        gameTimer: 60000,
        gameTimerOn: false,
      };
    default:
      return state;
  }
};

const useTimers = (isGameEnded, startGame, endGame) => {
  const timers = {
    countdown: 4000,
    countdownOn: false,
    gameTimer: 60000,
    gameTimerOn: false,
  };

  const [state, dispatch] = useReducer(reducer, timers);

  const gameTimer = state.gameTimer;
  const startCountdown = dispatch({ type: ACTIONS.START_COUNTDOWN });
  const stopCountdown = dispatch({ type: ACTIONS.STOP_COUNTDOWN });
  const decrementCountdown = dispatch({ type: ACTIONS.DECREMENT_COUNTDOWN });
  const startGameTimer = dispatch({ type: ACTIONS.START_GAME_TIMER });
  const stopGameTimer = dispatch({ type: ACTIONS.STOP_GAME_TIMER });
  const decrementGameTimer = dispatch({ type: ACTIONS.DECREMENT_GAME_TIMER });
  const restartTimers = dispatch({ type: ACTIONS.RESTART_TIMERS });

  // Countdown from 4 when first loaded into page.
  useEffect(() => {
    let interval = null;

    if (state.countdown < 0) {
      stopCountdown();
      startGame();
      startGameTimer();
    } else if (state.countdownOn) {
      interval = setInterval(() => {
        decrementCountdown();
      }, 1000);
    } else if (!state.countdownOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [state.countdown, state.countdownOn]);

  // Start game timer when countdown is over and stop
  // when it has reached 0.
  useEffect(() => {
    let interval = null;

    if (isGameEnded) {
      stopGameTimer();
    } else if (state.gameTimer < 0) {
      stopGameTimer();
      endGame();
    } else if (state.gameTimerOn) {
      interval = setInterval(() => {
        decrementGameTimer();
      }, 1000);
    } else if (!state.gameTimerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [state.gameTimer, state.gameTimerOn]);

  return { gameTimer, startCountdown, restartTimers };
};

export default useTimers;
