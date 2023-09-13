import { useEffect, useReducer } from "react";
import { useSocket } from "../../../context/SocketContext";

const initialState = {
  clientStatus: "not_started",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "start_client":
      return { ...state, clientStatus: "started" };
    case "end_client":
      return { ...state, clientStatus: "ended" };
    case "reset_client":
      return initialState;
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const useClientStatus = (isRoomEnded) => {
  const { socket, joinedRoomCode } = useSocket();
  const [clientStatusState, clientStatusDispatch] = useReducer(
    reducer,
    initialState
  );

  // If client is finished typing and room has not ended, send this info to others in the room
  const { clientStatus } = clientStatusState;
  const isClientFinished = !isRoomEnded && clientStatus !== "ended";
  useEffect(() => {
    if (isClientFinished)
      socket.emit("send_client_finish", { room: joinedRoomCode });
  }, [socket, joinedRoomCode, isClientFinished]);

  // If room timer runs out or all clients finish typing, end client
  useEffect(() => {
    if (isRoomEnded) clientStatusDispatch({ type: "end_client" });
  }, [isRoomEnded]);

  return {
    clientStatusState,
    clientStatusDispatch,
  };
};

export default useClientStatus;
