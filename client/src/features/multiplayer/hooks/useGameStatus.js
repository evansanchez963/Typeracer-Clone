import { useEffect, useReducer } from "react";
import getTextData from "../../../services/gameServices";
import { useSocket } from "../../../context/SocketContext";

const SEVEN_SECONDS = 7000;
const ONE_MINUTE_THIRTY_SECONDS = 90000;

const initialState = {
  isLoading: true,
  loadError: null,
  gameStatus: "not_started",
  isClientHost: false,
  countdown: SEVEN_SECONDS,
  gameTimer: ONE_MINUTE_THIRTY_SECONDS,
  chars: [],
  words: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "page_loaded":
      return { ...state, isLoading: true };
    case "load_error":
      return { ...state, loadError: action.payload };
    case "start_game":
      return { ...state, gameStatus: "started" };
    case "end_game":
      return { ...state, gameStatus: "ended" };
    case "set_client_host":
      return { ...state, isClientHost: true };
    case "decrement_countdown":
      return { ...state, countdown: state.countdown - 1000 };
    case "decrement_game_timer":
      return { ...state, gameTimer: state.gameTimer - 1000 };
    case "set_timer_state":
      const { countdown, gameTimer } = action.payload;
      return { ...state, countdown, gameTimer };
    case "set_chars":
      return { ...state, chars: action.payload };
    case "set_words":
      return { ...state, words: action.payload };
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const useGameStatus = (userRoster, isRoomStarted, isRoomEnded) => {
  const { socket, joinedRoomCode } = useSocket();
  const [gameStatusState, gameStatusDispatch] = useReducer(
    reducer,
    initialState
  );

  const hostSocketId = Object.keys(userRoster)[0];
  const {
    isLoading,
    loadError,
    gameStatus,
    isClientHost,
    countdown,
    gameTimer,
  } = gameStatusState;
  const countdownOn =
    isRoomStarted && !isLoading && loadError === null && countdown > 0;
  const gameTimerOn =
    !isRoomEnded && gameStatus === "started" && !countdownOn && gameTimer > 0;

  // If client is first to join room, make client the host
  useEffect(() => {
    if (hostSocketId === socket.id)
      gameStatusDispatch({ type: "set_client_host" });
  }, [userRoster, socket, hostSocketId]);

  // The host fetches data for other players
  useEffect(() => {
    const getData = async () => {
      try {
        const text = await getTextData();
        gameStatusDispatch({ type: "set_chars", payload: text.split("") });
        gameStatusDispatch({ type: "set_words", payload: text.split(" ") });
        gameStatusDispatch({ type: "page_loaded" });
      } catch (err) {
        gameStatusDispatch({ type: "load_error", payload: err });
        gameStatusDispatch({ type: "page_loaded" });
      }
    };

    if (isLoading && isClientHost) getData();
  }, [isLoading, isClientHost]);

  // The host controls timer for other players
  useEffect(() => {
    if (isClientHost) {
      const timerState = { countdown, gameTimer };
      socket.emit("send_timer_state", {
        room: joinedRoomCode,
        timerState,
      });
    }
  }, [joinedRoomCode, socket, isClientHost, countdown, gameTimer]);

  // Players who are not the host recieve timer and fetch data from host
  const recieveTimerHandler = (data) => {
    gameStatusDispatch({ type: "set_timer_state", payload: data.timerState });
  };
  const recieveDataHandler = (data) => {
    gameStatusDispatch({ type: "set_chars", payload: data.chars });
    gameStatusDispatch({ type: "set_words", payload: data.words });
    gameStatusDispatch({ type: "page_loaded" });
  };
  useEffect(() => {
    socket.on("recieve_timer_state", recieveTimerHandler);
    socket.on("recieve_text_data", recieveDataHandler);
    return () => {
      socket.off("recieve_timer_state", recieveTimerHandler);
      socket.off("recieve_text_data", recieveDataHandler);
    };
  }, [socket]);

  // Countdown from 4 when two players join the room
  useEffect(() => {
    if (isClientHost) {
      let interval = null;

      if (countdownOn) {
        interval = setInterval(() => {
          gameStatusDispatch({ type: "decrement_countdown" });
        }, 1000);
      } else if (!countdownOn) {
        clearInterval(interval);
        gameStatusDispatch({ type: "start_game" });
      }

      return () => clearInterval(interval);
    }
  }, [isClientHost, countdown, countdownOn]);

  // Start game timer when countdown is over and stop game when it has reached 0
  useEffect(() => {
    if (isClientHost) {
      let interval = null;

      if (gameTimer === 0) {
        socket.emit("send_end_room", { room: joinedRoomCode, endRoom: true });
      } else if (gameTimerOn) {
        interval = setInterval(() => {
          gameStatusDispatch({ type: "decrement_game_timer" });
        }, 1000);
      } else if (!gameTimerOn) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }
  }, [joinedRoomCode, socket, isClientHost, gameTimer, gameTimerOn]);

  return { gameStatusState, gameStatusDispatch };
};

export default useGameStatus;
