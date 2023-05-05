import { useEffect, useReducer, useCallback } from "react";
import { useSocket } from "../../../context/SocketContext";

const initialState = {
  finishLine: [],
  readyToRestart: [],
  isRoomStarted: false,
  isRoomEnded: false,
};

const ACTIONS = {
  CLIENT_FINISH: "client finish",
  CLIENT_READY: "client ready",
  START_ROOM: "start room",
  END_ROOM: "end room",
  RESET_ROOM: "reset room",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CLIENT_FINISH:
      return { ...state, finishLine: [...state.finishLine, action.payload] };
    case ACTIONS.CLIENT_READY:
      return {
        ...state,
        readyToRestart: [...state.readyToRestart, action.payload],
      };
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
  const { socket, joinedRoomCode } = useSocket();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { finishLine, readyToRestart, isRoomStarted, isRoomEnded } = state;

  const hostSocketId = Object.keys(userRoster)[0];
  const rosterSize = Object.keys(userRoster).length;

  const clientFinish = useCallback(
    (socketId) => dispatch({ type: ACTIONS.CLIENT_FINISH, payload: socketId }),
    []
  );
  const clientReady = useCallback((socketId) => {
    dispatch({ type: ACTIONS.CLIENT_READY, payload: socketId });
  }, []);
  const startRoom = useCallback(
    () => dispatch({ type: ACTIONS.START_ROOM }),
    []
  );
  const endRoom = useCallback(() => dispatch({ type: ACTIONS.END_ROOM }), []);
  const resetRoom = useCallback(
    () => dispatch({ type: ACTIONS.RESET_ROOM }),
    []
  );

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

  const readyClientHandler = useCallback(
    (data) => {
      clientReady(data.socketId);
    },
    [clientReady]
  );

  // Set up socketio events for starting and ending room.
  useEffect(() => {
    socket.on("recieve_start_room", startRoomHandler);
    socket.on("recieve_end_room", endRoomHandler);
    socket.on("recieve_client_finish", updateFinishLine);
    socket.on("recieve_client_ready", readyClientHandler);

    return () => {
      socket.off("recieve_start_room", startRoomHandler);
      socket.off("recieve_end_room", endRoomHandler);
      socket.off("recieve_client_finish", updateFinishLine);
      socket.off("recieve_client_ready", readyClientHandler);
    };
  }, [
    socket,
    startRoomHandler,
    endRoomHandler,
    updateFinishLine,
    readyClientHandler,
  ]);

  // Start game when there are two clients in the same room.
  useEffect(() => {
    if (
      readyToRestart.length === 0 &&
      hostSocketId === socket.id &&
      rosterSize === 2
    )
      socket.emit("send_start_room", { room: joinedRoomCode, startRoom: true });
  }, [
    socket,
    joinedRoomCode,
    readyToRestart,
    hostSocketId,
    rosterSize,
    startRoom,
  ]);

  // When both clients finish typing (or one disconnects mid game), end game.
  useEffect(() => {
    if (hostSocketId === socket.id && finishLine.length === rosterSize)
      socket.emit("send_end_room", { room: joinedRoomCode, endRoom: true });
  }, [socket, joinedRoomCode, hostSocketId, finishLine, rosterSize, endRoom]);

  return {
    finishLine,
    readyToRestart,
    isRoomStarted,
    isRoomEnded,
    endRoom,
    resetRoom,
  };
};

export default useRoomStatus;
