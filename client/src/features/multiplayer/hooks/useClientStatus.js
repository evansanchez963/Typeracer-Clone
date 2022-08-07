import { useEffect, useReducer } from "react";

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

const useClientStatus = (isRoomStarted, isRoomEnded) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isClientReady, isClientStarted, isClientEnded } = state;

  const readyClient = () => dispatch({ type: ACTIONS.READY_CLIENT });
  const startClient = () => dispatch({ type: ACTIONS.START_GAME });
  const endClient = () => dispatch({ type: ACTIONS.END_CLIENT });
  const resetClient = () => dispatch({ type: ACTIONS.RESET_CLIENT });

  useEffect(() => {
    if (isRoomStarted) startClient();
    else if (isRoomEnded) endClient();
  }, [isRoomStarted, isRoomEnded]);

  return {
    isClientReady,
    isClientStarted,
    isClientEnded,
    readyClient,
    endClient,
    resetClient,
  };
};

export default useClientStatus;
