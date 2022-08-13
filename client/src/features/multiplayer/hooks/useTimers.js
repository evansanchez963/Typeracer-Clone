import { useEffect, useReducer, useCallback } from "react";
import { useSocket, useRoomCode } from "../../../context/SocketContext";

const initialState = {
  controlTimer: false,
  countdown: 7000,
  countdownOn: false,
  gameTimer: 60000,
  gameTimerOn: false,
};

const ACTIONS = {
  SET_CONTROL_TIMER: "set control timer",
  START_COUNTDOWN: "start countdown",
  STOP_COUNTDOWN: "stop countdown",
  DECREMENT_COUNTDOWN: "decrement countdown",
  START_GAME_TIMER: "start game timer",
  STOP_GAME_TIMER: "stop game timer",
  DECREMENT_GAME_TIMER: "decrement game timer",
  SET_TIMER_STATE: "set timer state",
  RESTART_TIMERS: "restart timers",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CONTROL_TIMER:
      return { ...state, controlTimer: true };
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
    case ACTIONS.SET_TIMER_STATE:
      return {
        ...state,
        countdown: action.payload.countdown,
        countdownOn: action.payload.countdownOn,
        gameTimer: action.payload.gameTimer,
        gameTimerOn: action.payload.gameTimerOn,
      };
    case ACTIONS.RESTART_TIMERS:
      return {
        ...state,
        countdown: 7000,
        countdownOn: false,
        gameTimer: 60000,
        gameTimerOn: false,
      };
    default:
      return state;
  }
};

const useTimers = (userRoster, isRoomStarted, isRoomEnded, startClient) => {
  const socket = useSocket();
  const roomCode = useRoomCode();

  const hostSocketId = Object.keys(userRoster)[0];

  const [state, dispatch] = useReducer(reducer, initialState);
  const { controlTimer, countdown, countdownOn, gameTimer, gameTimerOn } =
    state;

  const setControlTimer = () => dispatch({ type: ACTIONS.SET_CONTROL_TIMER });
  const startCountdown = () => dispatch({ type: ACTIONS.START_COUNTDOWN });
  const stopCountdown = () => dispatch({ type: ACTIONS.STOP_COUNTDOWN });
  const decrementCountdown = () =>
    dispatch({ type: ACTIONS.DECREMENT_COUNTDOWN });
  const startGameTimer = () => dispatch({ type: ACTIONS.START_GAME_TIMER });
  const stopGameTimer = () => dispatch({ type: ACTIONS.STOP_GAME_TIMER });
  const decrementGameTimer = () =>
    dispatch({ type: ACTIONS.DECREMENT_GAME_TIMER });
  const setTimerState = (timerState) =>
    dispatch({ type: ACTIONS.SET_TIMER_STATE, payload: timerState });
  const resetTimers = useCallback(
    () => dispatch({ type: ACTIONS.RESTART_TIMERS }),
    []
  );

  const recieveTimerHandler = useCallback((data) => {
    setTimerState(data.timerState);
  }, []);

  useEffect(() => {
    if (countdown < 0) startClient();
  }, [countdown, startClient]);

  // If client is first to join room, then control timer.
  useEffect(() => {
    socket.on("recieve_timer_state", recieveTimerHandler);

    if (hostSocketId === socket.id) setControlTimer();

    return () => {
      socket.off("recieve_timer_state", recieveTimerHandler);
    };
  }, [userRoster, socket, hostSocketId, recieveTimerHandler]);

  // While client controls timer, send timer state to the rest of the clients in the room.
  useEffect(() => {
    if (controlTimer) {
      const timerState = { countdown, countdownOn, gameTimer, gameTimerOn };
      socket.emit("send_timer_state", {
        room: roomCode,
        timerState: timerState,
      });
    }
  }, [
    roomCode,
    socket,
    controlTimer,
    countdown,
    countdownOn,
    gameTimer,
    gameTimerOn,
  ]);

  // Start countdown timer when two players are in the room.
  useEffect(() => {
    if (controlTimer && isRoomStarted) startCountdown();
  }, [controlTimer, isRoomStarted]);

  // Countdown from 4 when two players join the room.
  useEffect(() => {
    if (controlTimer) {
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
    }
  }, [controlTimer, countdown, countdownOn]);

  // Start game timer when countdown is over and stop game when it has reached 0.
  useEffect(() => {
    if (controlTimer) {
      let interval = null;

      if (isRoomEnded) {
        stopGameTimer();
      } else if (gameTimer === 0) {
        stopGameTimer();
        socket.emit("send_end_room", { room: roomCode, endRoom: true });
      } else if (gameTimerOn) {
        interval = setInterval(() => {
          decrementGameTimer();
        }, 1000);
      } else if (!gameTimerOn) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }
  }, [roomCode, socket, isRoomEnded, controlTimer, gameTimer, gameTimerOn]);

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
