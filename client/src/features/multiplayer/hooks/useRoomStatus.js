import { useEffect, useReducer, useCallback } from "react";
import { useSocket } from "../../../context/SocketContext";

const initialState = {
  finishLine: [],
  isRoomStarted: false,
  isRoomEnded: false,
};

const ACTIONS = {
  CLIENT_FINISH: "client finish",
  START_ROOM: "start room",
  FINISH_ROOM: "finish room",
  RESET_ROOM: "reset room",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CLIENT_FINISH:
      return { ...state, finishLine: [...state.finishLine, action.payload] };
    case ACTIONS.START_ROOM:
      return { ...state, isRoomStarted: true };
    case ACTIONS.FINISH_ROOM:
      return { ...state, isRoomFinished: true };
    case ACTIONS.RESTART_ROOM:
      return initialState;
    default:
      return state;
  }
};

const useRoomStatus = () => {
  const socket = useSocket();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { finishLine, isRoomStarted, isRoomEnded } = state;

  const clientFinish = (clientStats) =>
    dispatch({ type: ACTIONS.CLIENT_WON, payload: clientStats });
  const startRoom = () => dispatch({ type: ACTIONS.START_ROOM });
  const endRoom = useCallback(() => dispatch({ type: ACTIONS.END_ROOM }), []);
  const resetRoom = () => dispatch({ type: ACTIONS.RESET_ROOM });

  const startGameHandler = useCallback((data) => {
    if (data.start) startRoom();
  }, []);

  // Start game when there are two clients in the same room.
  useEffect(() => {
    socket.on("start_game", startGameHandler);

    return () => socket.off("start_game", startGameHandler);
  }, [socket, startGameHandler]);

  // When both clients finish typing, end game.
  useEffect(() => {
    if (finishLine.length === 2) endRoom();
  }, [finishLine, endRoom]);

  return {
    finishLine,
    isRoomStarted,
    isRoomEnded,
    clientFinish,
    endRoom,
    resetRoom,
  };
};

export default useRoomStatus;
