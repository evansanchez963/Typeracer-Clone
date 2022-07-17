import { useEffect, useState } from "react";
import {
  GameStatusInfo,
  ProgressBar,
  Paragraph,
  Input,
  ButtonRow,
  Statistics,
} from "../../../features/gamelogic/components/index";
import {
  useGameStatus,
  useFetch,
  useTimers,
  useInput,
  useIdxInfo,
  useTypeInfo,
  useCalcWPM,
  useFinalWPM,
  useTime,
  useAccuracy,
} from "../../../features/gamelogic/hooks/index";
import {
  getCharClass,
  getWordClass,
  formatTime,
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
  const { gameTimer, countdown, startCountdown, resetTimers } = useTimers(
    isGameEnded,
    startGame,
    endGame
  );
  const { isLoading, loadError, chars, words } = useFetch(startCountdown);
  const { currInput, inputValid, setCurrInput, setInputValid } = useInput();
  const {
    currCharIdx,
    currWordIdx,
    incCharIdx,
    decCharIdx,
    resetCharIdx,
    incWordIdx,
    resetWordIdx,
  } = useIdxInfo();
  const { charsTyped, errors, incCharsTyped, incErrors, resetTypeInfo } =
    useTypeInfo();
  const WPM = useCalcWPM(gameTimer, charsTyped, errors);
  const finalWPM = useFinalWPM(isGameEnded, WPM);
  const time = useTime(isGameEnded, gameTimer);
  const accuracy = useAccuracy(isGameEnded, charsTyped, errors);

  const gameStatus = {
    isGameStarted: isGameStarted,
    isGameEnded: isGameEnded,
  };
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

    if (isGameEnded) setCurrInput("");
    if (isGameEnded && isLoggedIn && time !== "") pushUserStats();
  }, [isLoggedIn, isGameEnded, finalWPM, time, accuracy]);

  const getStats = () => {
    if (isGameEnded) return <Statistics userStats={userStats} />;
    else return <></>;
  };

  if (loadError) {
    return <div id="py-error-screen">Error: {loadError.message}</div>;
  } else if (isLoading) {
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
              formatTime={formatTime}
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
