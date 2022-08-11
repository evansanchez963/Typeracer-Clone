import { useEffect, useReducer, useCallback } from "react";
import { useSocket, useRoomCode } from "../../../context/SocketContext";

const initialState = {
  isClientReady: false,
  isClientStarted: false,
  isClientEnded: false,
};

const ACTIONS = {
  READY_CLIENT: "ready client",
  START_CLIENT: "start game",
  END_CLIENT: "end game",
  RESET_CLIENT: "reset client",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.READY_CLIENT:
      return { ...state, isClientReady: true };
    case ACTIONS.START_CLIENT:
      return { ...state, isClientStarted: true };
    case ACTIONS.END_CLIENT:
      return { ...state, isClientReady: false, isClientEnded: true };
    case ACTIONS.RESET_CLIENT:
      return initialState;
    default:
      return state;
  }
};

const useClientStatus = (isRoomEnded) => {
  const socket = useSocket();
  const roomCode = useRoomCode();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isClientReady, isClientStarted, isClientEnded } = state;

  const readyClient = () => dispatch({ type: ACTIONS.READY_CLIENT });
  const startClient = useCallback(
    () => dispatch({ type: ACTIONS.START_CLIENT }),
    []
  );
  const endClient = () => dispatch({ type: ACTIONS.END_CLIENT });
  const resetClient = () => dispatch({ type: ACTIONS.RESET_CLIENT });

  // If client is finished typing and room has not ended, send this info to others in room.
  useEffect(() => {
    if (!isRoomEnded && isClientEnded)
      socket.emit("send_client_finish", { room: roomCode });
  }, [isRoomEnded, socket, roomCode, isClientEnded]);

  // If room timer runs out or all clients finish typing, end client.
  useEffect(() => {
    if (isRoomEnded) endClient();
  }, [isRoomEnded]);

  return {
    isClientReady,
    isClientStarted,
    isClientEnded,
    readyClient,
    startClient,
    endClient,
    resetClient,
  };
};

export default useClientStatus;
