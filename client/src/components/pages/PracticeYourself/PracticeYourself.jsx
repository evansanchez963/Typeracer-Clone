import {
  GameStatusInfo,
  ProgressBar,
  Paragraph,
  Input,
  ButtonRow,
} from "../../../features/singleplayer/components/index";
import { useGameStatus } from "../../../features/singleplayer/hooks/index";
import { getNetWPM, getTime } from "../../../features/singleplayer/utils/index";
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

  const handleSpace = () => {
    // Word in input matches current word index
    if (
      inputState.currInput === gameStatusState.words[idxInfoState.currWordIdx]
    ) {
      inputDispatch({ type: "reset_input" });
      idxInfoDispatch({ type: "reset_character_index" });
      idxInfoDispatch({ type: "increment_word_index" });
      typeInfoDispatch({ type: "increment_characters_typed" });
    }
    // If the word is incorrect...
    else {
      if (inputState.inputValid) {
        inputDispatch({ type: "add_character", payload: " " });
        idxInfoDispatch({ type: "increment_character_index" });
      }
      inputDispatch({ type: "set_valid", payload: false });
      typeInfoDispatch({ type: "increment_errors" });
    }
  };

  const handleBackspace = () => {
    if (!inputState.inputValid)
      inputDispatch({ type: "set_valid", payload: true });
    if (inputState.currInput !== "")
      idxInfoDispatch({ type: "decrement_character_index" });
  };

  const handleChar = (typedChar) => {
    const lastWord = gameStatusState.words.slice(-1)[0];
    const lastChar = lastWord.slice(-1);

    // If user is on the very last character and it's correct, end the game
    if (
      gameStatusState.words.length - 1 === idxInfoState.currWordIdx &&
      lastWord.length - 1 === idxInfoState.currCharIdx + 1 &&
      lastChar === typedChar
    ) {
      idxInfoDispatch({ type: "decrement_character_index" });
      idxInfoDispatch({ type: "increment_word_index" });
      gameStatusDispatch({ type: "end_game" });
    }
    // Evaluate the input character
    else {
      const charToCheck =
        gameStatusState.words[idxInfoState.currWordIdx][
          idxInfoState.currCharIdx + 1
        ];

      if (typedChar !== charToCheck) {
        if (inputState.inputValid) {
          inputDispatch({ type: "add_character", payload: " " });
          idxInfoDispatch({ type: "increment_character_index" });
        }
        inputDispatch({ type: "set_valid", payload: false });
        typeInfoDispatch({ type: "increment_errors" });
      } else {
        idxInfoDispatch({ type: "increment_character_index" });
        typeInfoDispatch({ type: "increment_characters_typed" });
      }
    }
  };

  const onKeyDown = (e) => {
    if (e.key === " ") {
      handleSpace();
    } else if (e.key === "Backspace") {
      handleBackspace();
    } else if (e.key !== "Shift" && inputState.inputValid) {
      handleChar(e.key);
    }
  };

  const onInputChange = (e) => {
    // If there is whitespace, do not concantenate it to currInput
    if (!/\s/.test(e.target.value))
      inputDispatch({ type: "set_input", payload: e.target.value });
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
              chars={gameStatusState.chars}
              charsTyped={typeInfoState.charsTyped}
              WPM={WPM}
            />

            <div className="singleplayer-typing-box">
              <Paragraph
                gameStatus={gameStatusState.gameStatus}
                words={gameStatusState.words}
                currInput={inputState.currInput}
                idxInfoState={idxInfoState}
              />
              <Input
                gameStatus={gameStatusState.gameStatus}
                onKeyDown={onKeyDown}
                onChange={onInputChange}
                currInput={inputState.currInput}
                inputValid={inputState.inputValid}
              />
            </div>
          </div>

          <ButtonRow
            gameStatus={gameStatusState.gameStatus}
            restart={restart}
          />
          {gameStatusState.gameStatus === "ended" && (
            <Statistics WPM={WPM} time={time} accuracy={accuracy} />
          )}
        </div>
      </section>
    );
  }
};

export default PracticeYourself;
