import { useEffect } from "react";
import {
  GameStatusInfo,
  ProgressBar,
  Paragraph,
  Input,
  ButtonRow,
  Statistics,
} from "../../../features/singleplayer/components/index";
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
} from "../../../features/singleplayer/hooks/index";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import "./PracticeYourself.css";

const PracticeYourself = () => {
  const isLoggedIn = useAuth();
  const { isStarted, isEnded, startGame, endGame, restartGame } =
    useGameStatus();
  const {
    countdown,
    countdownOn,
    gameTimer,
    gameTimerOn,
    startCountdown,
    resetTimers,
  } = useTimers(isEnded, startGame, endGame);
  const { isLoading, loadError, chars, words, resetTextInfo } = useFetch(
    isStarted,
    isEnded,
    startCountdown
  );
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
  const WPM = useCalcWPM(isStarted, isEnded, gameTimer, charsTyped, errors);
  const finalWPM = useFinalWPM(isStarted, isEnded, WPM);
  const time = useTime(isStarted, isEnded, gameTimer);
  const accuracy = useAccuracy(isStarted, isEnded, charsTyped, errors);

  const gameStatus = {
    isStarted,
    isEnded,
    startGame,
    endGame,
  };
  const timers = {
    countdown,
    countdownOn,
    gameTimer,
    gameTimerOn,
    startCountdown,
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
    finalWPM,
    time,
    accuracy,
  };
  const restart = () => {
    restartGame();
    resetTimers();
    resetTextInfo();
    resetInput();
    resetIdxInfo();
    resetTypeInfo();
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
        await axios.put(`/api/user/${user.userId}/session`, userData, config);
      } catch (err) {
        alert(err.message);
      }
    };

    if (gameStatus.isStarted && gameStatus.isEnded) setCurrInput("");
    if (gameStatus.isStarted && gameStatus.isEnded && isLoggedIn && time !== "")
      pushUserStats();
  }, [
    isLoggedIn,
    gameStatus.isStarted,
    gameStatus.isEnded,
    finalWPM,
    time,
    accuracy,
  ]);

  const getStats = () => {
    if (gameStatus.isEnded) return <Statistics userStats={userStats} />;
    else return <></>;
  };

  if (loadError) {
    return <div id="singleplayer-error-screen">Error: {loadError.message}</div>;
  } else if (isLoading) {
    return <div id="singleplayer-loading-screen">Loading...</div>;
  } else {
    return (
      <section id="practice-yourself">
        <div className="singleplayer-wrapper">
          <h1>Practice Racetrack</h1>

          <div className="singleplayer-typing-section">
            <GameStatusInfo gameStatus={gameStatus} timers={timers} />
            <ProgressBar
              chars={textInfo.chars}
              charsTyped={typeInfo.charsTyped}
              WPM={WPM}
            />

            <div className="singleplayer-typing-box">
              <Paragraph
                gameStatus={gameStatus}
                words={textInfo.words}
                currInput={inputInfo.currInput}
                idxInfo={idxInfo}
              />
              <Input
                gameStatus={gameStatus}
                textInfo={textInfo}
                inputInfo={inputInfo}
                idxInfo={idxInfo}
                typeInfo={typeInfo}
              />
            </div>
          </div>

          <ButtonRow isEnded={gameStatus.isEnded} restart={restart} />
          {getStats()}
        </div>
      </section>
    );
  }
};

export default PracticeYourself;
