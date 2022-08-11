import { useState, useEffect } from "react";
import { useSocket, useRoomCode } from "../../../context/SocketContext";
import {
  GameroomStatusInfo,
  UserProgressBar,
  Paragraph,
  Input,
} from "../../../features/multiplayer/components/index";
import {
  useRoomStatus,
  useClientStatus,
  useTimers,
  useFetch,
  useCalcWPM,
  useTime,
  useAccuracy,
} from "../../../features/multiplayer/hooks/index";
import {
  useInput,
  useIdxInfo,
  useTypeInfo,
} from "../../../features/coreGameLogic/hooks/index";
import "./GameRoom.css";

const GameRoom = () => {
  const [userRoster, setUserRoster] = useState({});

  const socket = useSocket();
  const roomCode = useRoomCode();

  const { finishLine, isRoomStarted, isRoomEnded, clientFinish, resetRoom } =
    useRoomStatus(userRoster);
  const {
    isClientReady,
    isClientStarted,
    isClientEnded,
    readyClient,
    startClient,
    endClient,
    resetClient,
  } = useClientStatus(isRoomEnded);
  const { countdown, countdownOn, gameTimer, gameTimerOn, resetTimers } =
    useTimers(userRoster, isRoomStarted, isRoomEnded, startClient, endClient);
  const { isLoading, loadError, chars, words, resetTextInfo } =
    useFetch(userRoster);

  // Core game logic.
  const {
    currInput,
    inputValid,
    setCurrInput,
    addChar,
    setInputValid,
    resetInput,
  } = useInput();
  const {
    currCharIdx,
    currWordIdx,
    incCharIdx,
    decCharIdx,
    resetCharIdx,
    incWordIdx,
    resetWordIdx,
    resetIdxInfo,
  } = useIdxInfo();
  const { charsTyped, errors, incCharsTyped, incErrors, resetTypeInfo } =
    useTypeInfo();

  const WPM = useCalcWPM(
    isClientStarted,
    isClientEnded,
    gameTimer,
    charsTyped,
    errors
  );
  const time = useTime(isClientStarted, isClientEnded, gameTimer);
  const accuracy = useAccuracy(
    isClientStarted,
    isClientEnded,
    charsTyped,
    errors
  );

  // Organize the data into objects.
  const roomStatus = {
    finishLine,
    isRoomStarted,
    isRoomEnded,
    clientFinish,
  };
  const clientStatus = {
    isClientReady,
    isClientStarted,
    isClientEnded,
    readyClient,
    endClient,
  };
  const timers = {
    countdown,
    countdownOn,
    gameTimer,
    gameTimerOn,
  };
  const textInfo = {
    chars,
    words,
  };
  const inputInfo = {
    currInput,
    inputValid,
    addChar,
    setCurrInput,
    setInputValid,
  };
  const idxInfo = {
    currCharIdx,
    currWordIdx,
    incCharIdx,
    decCharIdx,
    resetCharIdx,
    incWordIdx,
    resetWordIdx,
  };
  const typeInfo = {
    charsTyped,
    errors,
    incCharsTyped,
    incErrors,
  };
  const userStats = {
    WPM,
    time,
    accuracy,
  };
  const restart = () => {
    resetRoom();
    resetClient();
    resetTimers();
    resetTextInfo();
    resetInput();
    resetIdxInfo();
    resetTypeInfo();
  };

  const updateJoinedUsers = (data) => {
    const userInfo = {};
    for (const client in data) {
      userInfo[client] = data[client];
    }
    setUserRoster(userInfo);
  };

  const renderUsers = () => {
    return (
      <div className="user-list">
        {Object.keys(userRoster).map((client, index) => {
          return (
            <div key={client} className="user">
              {userRoster[client]} {socket.id === client ? "(you)" : ""}
              <UserProgressBar
                recieveDataFrom={Object.keys(userRoster)[index]}
                chars={textInfo.chars}
                charsTyped={typeInfo.charsTyped}
                WPM={WPM}
              ></UserProgressBar>
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    socket.on("get_user_roster", updateJoinedUsers);
    socket.emit("connect_to_room", { room: roomCode });

    return () => socket.off("get_user_roster", updateJoinedUsers);
  }, [socket, roomCode]);

  useEffect(() => {
    if (clientStatus.isClientStarted && clientStatus.isClientEnded)
      setCurrInput("");
  }, [clientStatus.isClientStarted, clientStatus.isClientEnded, setCurrInput]);

  if (loadError) {
    return <div id="multiplayer-error-screen">Error: {loadError.message}</div>;
  } else if (isLoading) {
    return <div id="multiplayer-loading-screen">Loading...</div>;
  } else
    return (
      <section id="game-room">
        <div className="multiplayer-wrapper">
          <div className="multiplayer-typing-section">
            <GameroomStatusInfo
              roomStatus={roomStatus}
              clientStatus={clientStatus}
              timers={timers}
            ></GameroomStatusInfo>
            {renderUsers()}

            <div className="multiplayer-typing-box">
              <Paragraph
                clientStatus={clientStatus}
                words={textInfo.words}
                currInput={inputInfo.currInput}
                idxInfo={idxInfo}
              ></Paragraph>
              <Input
                clientStatus={clientStatus}
                textInfo={textInfo}
                inputInfo={inputInfo}
                idxInfo={idxInfo}
                typeInfo={typeInfo}
              ></Input>
            </div>
          </div>
        </div>
      </section>
    );
};

export default GameRoom;
