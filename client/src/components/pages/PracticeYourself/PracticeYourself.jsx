import { useEffect, useMemo, useCallback } from "react";
import {
  GameStatusInfo,
  ProgressBar,
  Paragraph,
  Input,
  ButtonRow,
} from "../../../features/singleplayer/components/index";
import {
  useGameStatus,
  useAccuracy,
} from "../../../features/singleplayer/hooks/index";
import {
  getNetWPM,
  getTime,
} from "../../../features/singleplayer/utils/getNetWPM";
import Statistics from "../../../features/coreGameLogic/components/Statistics/Statistics";
import {
  useInput,
  useIdxInfo,
  useTypeInfo,
} from "../../../features/coreGameLogic/hooks/index";
import { getAccuracy } from "../../../features/coreGameLogic/utils/index";
import { useAuth } from "../../../context/AuthContext";
import { saveUserStats } from "../../../services/userServices";
import "./PracticeYourself.css";

const PracticeYourself = () => {
  const { isLoggedIn } = useAuth();
  const { gameStatusState, gameStatusDispatch } = useGameStatus();
  const { inputState, inputDispatch } = useInput();
  const { idxInfoState, idxInfoDispatch } = useIdxInfo();
  const { typeInfoState, typeInfoDispatch } = useTypeInfo();
  const WPM = useMemo(
    () =>
      getNetWPM(
        gameStatusState.gameStatus,
        gameStatusState.gameTimer,
        typeInfoState.charsTyped,
        typeInfoState.errors
      ),
    [
      gameStatusState.gameStatus,
      gameStatusState.gameTimer,
      typeInfoState.charsTyped,
      typeInfoState.errors,
    ]
  );
  const time = useMemo(
    () => getTime(gameStatusState.gameStatus, gameStatusState.gameTimer),
    [gameStatusState.gameStatus, gameStatusState.gameTimer]
  );
  const accuracy = useMemo(
    () => getAccuracy(typeInfoState.charsTyped, typeInfoState.errors),
    [typeInfoState.charsTyped, typeInfoState.errors]
  );

  const userStats = useMemo(() => {
    return {
      WPM,
      time,
      accuracy,
    };
  }, [WPM, time, accuracy]);

  useEffect(() => {
    const pushUserStats = async () => {
      try {
        await saveUserStats(userStats);
      } catch (err) {
        alert(err.message);
      }
    };

    if (isLoggedIn && gameStatusState.gameStatus === "ended") pushUserStats();
  }, [isLoggedIn, gameStatusState.gameStatus, userStats]);

  const getStats = () => {
    if (gameStatus.isEnded) return <Statistics userStats={userStats} />;
    else return <></>;
  };

  const restart = () => {
    restartGame();
    resetTimers();
    resetTextInfo();
    resetInput();
    resetIdxInfo();
    resetTypeInfo();
  };

  if (gameStatusState.loadError) {
    return (
      <div id="singleplayer-error-screen">
        Error: {gameStatusState.loadError.message}
      </div>
    );
  } else if (gameStatusState.isLoading) {
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
