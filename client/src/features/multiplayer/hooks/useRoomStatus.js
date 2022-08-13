import { useEffect, useReducer, useCallback } from "react";
import { useSocket, useRoomCode } from "../../../context/SocketContext";

const initialState = {
  finishLine: [],
  isRoomStarted: false,
  isRoomEnded: false,
};

const ACTIONS = {
  CLIENT_FINISH: "client finish",
  START_ROOM: "start room",
  END_ROOM: "end room",
  RESET_ROOM: "reset room",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CLIENT_FINISH:
      return { ...state, finishLine: [...state.finishLine, action.payload] };
    case ACTIONS.START_ROOM:
      return { ...state, isRoomStarted: true };
    case ACTIONS.END_ROOM:
      return { ...state, isRoomEnded: true };
    case ACTIONS.RESET_ROOM:
      return initialState;
    default:
      return state;
  }
};

const useRoomStatus = (userRoster) => {
  const socket = useSocket();
  const roomCode = useRoomCode();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { finishLine, isRoomStarted, isRoomEnded } = state;

  const hostSocketId = Object.keys(userRoster)[0];
  const rosterSize = Object.keys(userRoster).length;

  const clientFinish = useCallback(
    (socketId) => dispatch({ type: ACTIONS.CLIENT_FINISH, payload: socketId }),
    []
  );
  const startRoom = useCallback(
    () => dispatch({ type: ACTIONS.START_ROOM }),
    []
  );
  const endRoom = useCallback(() => dispatch({ type: ACTIONS.END_ROOM }), []);
  const resetRoom = () => dispatch({ type: ACTIONS.RESET_ROOM });

  const startRoomHandler = useCallback(
    (data) => {
      if (data.startRoom) startRoom();
    },
    [startRoom]
  );

  const endRoomHandler = useCallback(
    (data) => {
      if (data.endRoom) endRoom();
    },
    [endRoom]
  );

  const updateFinishLine = useCallback(
    (data) => {
      clientFinish(data.socketId);
    },
    [clientFinish]
  );

  // Set up socketio events for starting and ending room.
  useEffect(() => {
    socket.on("recieve_start_room", startRoomHandler);
    socket.on("recieve_end_room", endRoomHandler);
    socket.on("recieve_client_finish", updateFinishLine);

    return () => {
      socket.off("recieve_start_room", startRoomHandler);
      socket.off("recieve_end_room", endRoomHandler);
      socket.off("recieve_client_finish", updateFinishLine);
    };
  }, [socket, startRoomHandler, endRoomHandler, updateFinishLine]);

  // Start game when there are two clients in the same room.
  useEffect(() => {
    if (hostSocketId === socket.id && rosterSize === 2)
      socket.emit("send_start_room", { room: roomCode, startRoom: true });
  }, [socket, roomCode, hostSocketId, rosterSize, startRoom]);

  // When both clients finish typing (or one disconnects mid game), end game.
  useEffect(() => {
    if (hostSocketId === socket.id && finishLine.length === rosterSize)
      socket.emit("send_end_room", { room: roomCode, endRoom: true });
  }, [socket, roomCode, hostSocketId, finishLine, rosterSize, endRoom]);

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
