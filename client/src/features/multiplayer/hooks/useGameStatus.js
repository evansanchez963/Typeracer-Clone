import { useEffect, useReducer } from "react";
import { useSocket } from "../../../context/SocketContext";

const initialState = {
  roomStatus: "not_started",
  clientStatus: "not_started",
  clientsFinished: [],
  clientsReadyToRestart: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "start_room":
      return { ...state, roomStatus: "started" };
    case "end_room":
      return { ...state, roomStatus: "ended" };
    case "start_client":
      return { ...state, clientStatus: "started " };
    case "end_client":
      return { ...state, clientStatus: "ended" };
    case "reset_client":
      return { ...state, clientStatus: "not_started" };
    case "reset_room":
      return {
        ...state,
        roomStatus: "not_started",
        clientsFinished: [],
        clientsReadyToRestart: [],
      };
    default:
      return state;
  }
};

const useGameStatus = (userRoster) => {
  const { socket, joinedRoomCode } = useSocket();
  const [state, dispatch] = useReducer(reducer, initialState);
};

export default useGameStatus;
