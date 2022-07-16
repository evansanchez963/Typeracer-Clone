import { useEffect, useState } from "react";
import {
  GameStatusInfo,
  ProgressBar,
  Paragraph,
  Input,
  ButtonRow,
  Statistics,
} from "../../../features/gamelogic/index";
import {
  useGameStatus,
  useFetch,
  useTimers,
  useCalcWPM,
  useFinalWPM,
  useTime,
  useAccuracy,
} from "../../../features/gamelogic/hooks/index";
import {
  getCharClass,
  getWordClass,
  getTime,
  handleKeyDown,
  handleChange,
} from "../../../features/gamelogic/utils/index";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import "./PracticeYourself.css";

const PracticeYourself = () => {
  const isLoggedIn = useAuth();
  const { isGameStarted, isGameEnded, startGame, endGame, restartGame } =
    useGameStatus();
  /*
  const [gameStatus, setGameStatus] = useState({
    isStarted: false,
    isEnded: false,
  });
  */
  //const { countdown, setCountdown, gameTimer } = useTimers...
  const { startCountdown, resetTimers } = useTimers(
    isGameEnded,
    startGame,
    endGame
  );
  //const { loadInfo, textInfo } = useFetch(startCountdown);
  const { isLoading, loadError, chars, words } = useFetch(startCountdown);
  const [inputInfo, setInputInfo] = useState({
    currInput: "",
    inputValid: true,
  });
  const [idxInfo, setIdxInfo] = useState({ currCharIdx: -1, currWordIdx: 0 });
  const [userTypeInfo, setUserTypeInfo] = useState({
    charsTyped: 0,
    errors: 0,
  });
  const WPM = useCalcWPM(
    gameTimer.time,
    userTypeInfo.charsTyped,
    userTypeInfo.errors
  );
  const finalWPM = useFinalWPM(gameStatus, WPM);
  const time = useTime(gameStatus, gameTimer);
  const accuracy = useAccuracy(gameStatus, userTypeInfo);

  const userStats = {
    finalWPM: finalWPM,
    time: time,
    accuracy: accuracy,
  };

  useEffect(() => {
    const pushUserStats = async () => {
      const userObject = localStorage.getItem("userData");
      const user = JSON.parse(userObject);
      const userData = {
        WPM: finalWPM,
        time: time,
        accuracy: accuracy,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      try {
        await axios.put(`api/user/${user.userId}/session`, userData, config);
      } catch (err) {
        console.log(err.response);
        alert(err.message);
      }
    };

    if (isGameEnded) setInputInfo((prev) => ({ ...prev, currInput: "" }));
    if (isGameEnded && isLoggedIn && time !== "") pushUserStats();
  }, [isLoggedIn, isGameEnded, finalWPM, time, accuracy]);

  const getStats = () => {
    if (isGameEnded) return <Statistics userStats={userStats} />;
    else return <></>;
  };

  if (loadInfo.loadError) {
    return <div id="py-error-screen">Error: {loadInfo.loadError.message}</div>;
  } else if (loadInfo.isLoading) {
    return <div id="py-loading-screen">Loading...</div>;
  } else {
    return (
      <section id="practice-yourself">
        <div className="py-wrapper">
          <h1>Practice Racetrack</h1>

          <div className="typing-section">
            <GameStatusInfo
              gameStatus={gameStatus}
              countdown={countdown}
              gameTimer={gameTimer}
              getTime={getTime}
            />
            <ProgressBar
              chars={textInfo.chars}
              charsTyped={userTypeInfo.charsTyped}
              WPM={WPM}
            />

            <div className="typing-box">
              <Paragraph
                words={textInfo.words}
                getCharClass={getCharClass}
                getWordClass={getWordClass}
                gameStatus={gameStatus}
                inputInfo={inputInfo}
                idxInfo={idxInfo}
              />
              <Input
                inputInfo={inputInfo}
                gameStatus={gameStatus}
                handleKeyDown={(event) => {
                  handleKeyDown(
                    event,
                    setGameStatus,
                    textInfo,
                    inputInfo,
                    setInputInfo,
                    idxInfo,
                    setIdxInfo,
                    setUserTypeInfo
                  );
                }}
                handleChange={(event) => {
                  handleChange(event, setInputInfo);
                }}
              />
            </div>
          </div>

          <ButtonRow isEnded={isGameEnded} />
          {getStats()}
        </div>
      </section>
    );
  }
};

export default PracticeYourself;
