import { useState, useEffect } from "react";
import { useSocket } from "../../../../context/SocketContext";
import {
  GameroomStatusInfo,
  UserProgressBar,
  Paragraph,
  Input,
  ButtonRow,
} from "../../../../features/multiplayer/components/index";
import Statistics from "../../../../features/coreGameLogic/components/Statistics/Statistics";
import {
  useRoomStatus,
  useClientStatus,
  useGameStatus,
} from "../../../../features/multiplayer/hooks/index";
import {
  useInput,
  useIdxInfo,
  useTypeInfo,
} from "../../../../features/coreGameLogic/hooks/index";
import { useAuth } from "../../../../context/AuthContext";
import { saveUserStats } from "../../../../services/userServices";
import { getAccuracy } from "../../../features/coreGameLogic/utils/index";
import "./GameRoom.css";

const GameRoom = ({ roomCode }) => {
  // Multiplayer state and custom hooks
  const [userRoster, setUserRoster] = useState({});
  const { isLoggedIn, username } = useAuth();
  const { socket, handleJoinRoom, handleLeaveRoom } = useSocket();
  const { roomStatusState, roomStatusDispatch } = useRoomStatus(userRoster);
  const { isRoomStarted, isRoomEnded } = roomStatusState;
  const { gameStatusState, gameStatusDispatch } = useGameStatus(
    userRoster,
    isRoomStarted,
    isRoomEnded
  );
  const { countdown } = gameStatusState;
  const { clientStatusState, clientStatusDispatch } = useClientStatus(
    isRoomEnded,
    countdown
  );

  // Core game custom hooks and functions
  const { inputState, inputDispatch } = useInput();
  const { idxInfoState, idxInfoDispatch } = useIdxInfo();
  const { typeInfoState, typeInfoDispatch } = useTypeInfo();
  const { gameStatus, gameTimer } = gameStatusState;
  const { charsTyped, errors } = typeInfoState;
  const WPM = getNetWPM(gameStatus, gameTimer, charsTyped, errors);
  const time = getTime(gameStatus, gameTimer);
  const accuracy = getAccuracy(charsTyped);

  const updateJoinedUsers = (data) => {
    const userInfo = {};
    for (const client in data) {
      userInfo[client] = data[client];
    }
    setUserRoster(userInfo);
  };

  useEffect(() => {
    handleJoinRoom({ room: roomCode, user: isLoggedIn ? username : "Guest" });

    return () =>
      handleLeaveRoom({
        room: roomCode,
        user: isLoggedIn ? username : "Guest",
      });
  }, []);

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
