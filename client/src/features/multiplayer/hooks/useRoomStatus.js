import { useEffect, useReducer } from "react";
import { useSocket } from "../../../context/SocketContext";

const initialState = {
  roomStatus: "not_started",
  finishedClients: [],
  clientsReadyToRestart: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "start_room":
      return { ...state, roomStatus: "started" };
    case "end_room":
      return { ...state, roomStatus: "ended" };
    case "add_finished_client":
      return {
        ...state,
        finishedClients: [...state.finishedClients, action.payload],
      };
    case "add_ready_restart_client":
      return {
        ...state,
        clientsReadyToRestart: [...state.clientsReadyToRestart, action.payload],
      };
    case "reset_room":
      return initialState;
    default:
      throw Error("Unknown action: " + action.type);
  }
};

const useRoomStatus = (userRoster) => {
  const { socket, joinedRoomCode } = useSocket();
  const [roomStatusState, roomStatusDispatch] = useReducer(
    reducer,
    initialState
  );
  const hostSocketId = Object.keys(userRoster)[0];
  const rosterSize = Object.keys(userRoster).length;

  const startRoomHandler = (data) => {
    if (data.startRoom) roomStatusDispatch({ type: "start_room" });
  };
  const endRoomHandler = (data) => {
    if (data.endRoom) roomStatusDispatch({ type: "end_room" });
  };
  const addFinishedHandler = (socketId) => {
    roomStatusDispatch({ type: "add_finished_client", payload: socketId });
  };
  const addReadyHandler = (socketId) => {
    roomStatusDispatch({ type: "add_ready_restart_client", payload: socketId });
  };

  // Set up socketio events for starting and ending room
  useEffect(() => {
    socket.on("recieve_start_room", startRoomHandler);
    socket.on("recieve_end_room", endRoomHandler);
    socket.on("recieve_client_finish", addFinishedHandler);
    socket.on("recieve_client_ready", addReadyHandler);

    return () => {
      socket.off("recieve_start_room", startRoomHandler);
      socket.off("recieve_end_room", endRoomHandler);
      socket.off("recieve_client_finish", addFinishedHandler);
      socket.off("recieve_client_ready", addReadyHandler);
    };
  }, [socket]);

  // Start game when there are two clients in the same room
  const { clientsReadyToRestart } = roomStatusState;
  const shouldStartRoom =
    clientsReadyToRestart.length === 0 &&
    hostSocketId === socket.id &&
    rosterSize === 2;
  useEffect(() => {
    if (shouldStartRoom)
      socket.emit("send_start_room", { room: joinedRoomCode, startRoom: true });
  }, [socket, shouldStartRoom, joinedRoomCode]);

  // When both clients finish typing (or one disconnects mid game), end game
  const { finishedClients } = roomStatusState;
  const shouldEndRoom =
    hostSocketId === socket.id && finishedClients.length === rosterSize;
  useEffect(() => {
    if (shouldEndRoom)
      socket.emit("send_end_room", { room: joinedRoomCode, endRoom: true });
  }, [socket, shouldEndRoom, joinedRoomCode]);

  return {
    roomStatusState,
    roomStatusDispatch,
  };
};

export default useRoomStatus;
