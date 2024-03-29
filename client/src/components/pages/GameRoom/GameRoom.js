import { useState, useEffect, useMemo, useCallback } from "react";
import { useSocket, useRoomCode } from "../../../context/SocketContext";
import {
  GameroomStatusInfo,
  UserProgressBar,
  Paragraph,
  Input,
  ButtonRow,
} from "../../../features/multiplayer/components/index";
import Statistics from "../../../features/coreGameLogic/components/Statistics/Statistics";
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
import { useAuth } from "../../../context/AuthContext";
import { saveUserStats } from "../../../services/userServices";
import "./GameRoom.css";

const GameRoom = () => {
  const isLoggedIn = useAuth();
  const [userRoster, setUserRoster] = useState({});

  const socket = useSocket();
  const roomCode = useRoomCode();

  const { finishLine, readyToRestart, isRoomStarted, isRoomEnded, resetRoom } =
    useRoomStatus(userRoster);
  const {
    isClientStarted,
    isClientEnded,
    startClient,
    endClient,
    resetClient,
  } = useClientStatus(isRoomEnded);
  const { countdown, countdownOn, gameTimer, gameTimerOn, resetTimers } =
    useTimers(userRoster, isRoomStarted, isRoomEnded, startClient, endClient);
  const { isLoading, loadError, chars, words, resetTextInfo } =
    useFetch(userRoster);
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
  };
  const clientStatus = {
    isClientStarted,
    isClientEnded,
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
  const userStats = useMemo(() => {
    return {
      WPM,
      time,
      accuracy,
    };
  }, [WPM, time, accuracy]);

  const updateJoinedUsers = (data) => {
    const userInfo = {};
    for (const client in data) {
      userInfo[client] = data[client];
    }
    setUserRoster(userInfo);
  };

  // Every time user joins room, display users connected to that room.
  useEffect(() => {
    socket.on("get_user_roster", updateJoinedUsers);
    socket.emit("connect_to_room", { room: roomCode });

    return () => socket.off("get_user_roster", updateJoinedUsers);
  }, [socket, roomCode]);

  // When client finishes typing, check if they are logged in and push stats to their account.
  useEffect(() => {
    const pushUserStats = async () => {
      try {
        await saveUserStats(userStats);
      } catch (err) {
        alert(err.message);
      }
    };

    if (
      clientStatus.isClientStarted &&
      clientStatus.isClientEnded &&
      isLoggedIn
    )
      pushUserStats();
  }, [
    isLoggedIn,
    clientStatus.isClientStarted,
    clientStatus.isClientEnded,
    userStats,
  ]);

  // Empty input when game has not started or has already ended.
  useEffect(() => {
    if (clientStatus.isClientStarted && clientStatus.isClientEnded)
      setCurrInput("");
  }, [clientStatus.isClientStarted, clientStatus.isClientEnded, setCurrInput]);

  const restart = useCallback(() => {
    resetRoom();
    resetClient();
    resetTimers();
    resetTextInfo();
    resetInput();
    resetIdxInfo();
    resetTypeInfo();
  }, [
    resetRoom,
    resetClient,
    resetTimers,
    resetTextInfo,
    resetInput,
    resetIdxInfo,
    resetTypeInfo,
  ]);

  // When both clients are finished typing and want to reset the game, reset game.
  useEffect(() => {
    if (
      isRoomStarted &&
      isRoomEnded &&
      readyToRestart.length === Object.keys(userRoster).length
    )
      restart();
  }, [userRoster, isRoomStarted, isRoomEnded, readyToRestart, restart]);

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

  const getStats = () => {
    if (clientStatus.isClientEnded)
      return <Statistics userStats={userStats}></Statistics>;
    else return <></>;
  };

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
              socketId={socket.id}
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

          <ButtonRow isClientEnded={clientStatus.isClientEnded}></ButtonRow>
          {getStats()}
        </div>
      </section>
    );
};

export default GameRoom;
