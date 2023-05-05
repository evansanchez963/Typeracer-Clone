import { useEffect, useReducer, useCallback } from "react";
import { useSocket } from "../../../context/SocketContext";

const initialState = {
  isClientStarted: false,
  isClientEnded: false,
};

const ACTIONS = {
  START_CLIENT: "start game",
  END_CLIENT: "end game",
  RESET_CLIENT: "reset client",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.START_CLIENT:
      return { ...state, isClientStarted: true };
    case ACTIONS.END_CLIENT:
      return { ...state, isClientEnded: true };
    case ACTIONS.RESET_CLIENT:
      return initialState;
    default:
      return state;
  }
};

const useClientStatus = (isRoomEnded) => {
  const { socket, joinedRoomCode } = useSocket();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isClientStarted, isClientEnded } = state;

  const startClient = useCallback(
    () => dispatch({ type: ACTIONS.START_CLIENT }),
    []
  );
  const endClient = () => dispatch({ type: ACTIONS.END_CLIENT });
  const resetClient = useCallback(
    () => dispatch({ type: ACTIONS.RESET_CLIENT }),
    []
  );

  // If client is finished typing and room has not ended, send this info to others in room.
  useEffect(() => {
    if (!isRoomEnded && isClientEnded)
      socket.emit("send_client_finish", { room: joinedRoomCode });
  }, [isRoomEnded, socket, joinedRoomCode, isClientEnded]);

  // If room timer runs out or all clients finish typing, end client.
  useEffect(() => {
    if (isRoomEnded) endClient();
  }, [isRoomEnded]);

  return {
    isClientStarted,
    isClientEnded,
    startClient,
    endClient,
    resetClient,
  };
};

export default useClientStatus;
