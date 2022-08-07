import { useEffect, useReducer } from "react";

const initialState = {
  countdown: 7000,
  countdownOn: false,
  gameTimer: 60000,
  gameTimerOn: false,
};

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
      return initialState;
    default:
      return state;
  }
};

const useTimers = (isRoomStarted, isRoomEnded) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { countdown, countdownOn, gameTimer, gameTimerOn } = state;

  const startCountdown = () => dispatch({ type: ACTIONS.START_COUNTDOWN });
  const stopCountdown = () => dispatch({ type: ACTIONS.STOP_COUNTDOWN });
  const decrementCountdown = () =>
    dispatch({ type: ACTIONS.DECREMENT_COUNTDOWN });
  const startGameTimer = () => dispatch({ type: ACTIONS.START_GAME_TIMER });
  const stopGameTimer = () => dispatch({ type: ACTIONS.STOP_GAME_TIMER });
  const decrementGameTimer = () =>
    dispatch({ type: ACTIONS.DECREMENT_GAME_TIMER });
  const resetTimers = () => dispatch({ type: ACTIONS.RESTART_TIMERS });

  // Start countdown timer when two players are in the room.
  useEffect(() => {
    if (isRoomStarted) startCountdown();
  }, [isRoomStarted]);

  // Countdown from 4 when two players join the room.
  useEffect(() => {
    let interval = null;

    if (countdown < 0) {
      stopCountdown();
      startGameTimer();
    } else if (countdownOn) {
      interval = setInterval(() => {
        decrementCountdown();
      }, 1000);
    } else if (!countdownOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [countdown, countdownOn]);

  // Start game timer when countdown is over and stop
  // when it has reached 0.
  useEffect(() => {
    let interval = null;

    if (isRoomEnded) {
      stopGameTimer();
    } else if (gameTimer === 0) {
      stopGameTimer();
    } else if (gameTimerOn) {
      interval = setInterval(() => {
        decrementGameTimer();
      }, 1000);
    } else if (!gameTimerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRoomEnded, gameTimer, gameTimerOn]);

  return {
    countdown,
    countdownOn,
    gameTimer,
    gameTimerOn,
    startCountdown,
    resetTimers,
  };
};

export default useTimers;
