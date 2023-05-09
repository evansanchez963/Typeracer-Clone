import {
  GameStatusInfo,
  ProgressBar,
  Paragraph,
  Input,
  ButtonRow,
} from "../../../features/singleplayer/components/index";
import { useGameStatus } from "../../../features/singleplayer/hooks/index";
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
import "./PracticeYourself.css";

const PracticeYourself = () => {
  const { gameStatusState, gameStatusDispatch } = useGameStatus();
  const { inputState, inputDispatch } = useInput();
  const { idxInfoState, idxInfoDispatch } = useIdxInfo();
  const { typeInfoState, typeInfoDispatch } = useTypeInfo();
  const WPM = getNetWPM(
    gameStatusState.gameStatus,
    gameStatusState.gameTimer,
    typeInfoState.charsTyped,
    typeInfoState.errors
  );
  const time = getTime(gameStatusState.gameStatus, gameStatusState.gameTimer);
  const accuracy = getAccuracy(typeInfoState.charsTyped, typeInfoState.errors);

  const getStats = () => {
    if (gameStatusState === "ended")
      return <Statistics WPM={WPM} time={time} accuracy={accuracy} />;
    else return <></>;
  };

  const restart = () => {
    gameStatusDispatch({ type: "restart_game" });
    inputDispatch({ type: "reset_input" });
    idxInfoDispatch({ type: "reset_idx_info" });
    typeInfoDispatch({ type: "reset_type_info" });
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
            <GameStatusInfo
              gameStatus={gameStatusState.gameStatus}
              countdown={gameStatusState.countdown}
              gameTimer={gameStatusState.gameTimer}
            />
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
