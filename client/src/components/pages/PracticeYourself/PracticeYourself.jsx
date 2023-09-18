import {
  GameStatusInfo,
  ProgressBar,
  Paragraph,
  Input,
  ButtonRow,
} from "../../../features/singleplayer/components/index";
import useGameStatus from "../../../features/singleplayer/hooks/useGameStatus";
import Statistics from "../../../features/coreGameLogic/components/Statistics/Statistics";
import {
  useInput,
  useIdxInfo,
  useTypeInfo,
} from "../../../features/coreGameLogic/hooks/index";
import {
  getNetWPM,
  getTime,
  getAccuracy,
} from "../../../features/coreGameLogic/utils/index";
import "./PracticeYourself.css";

const PracticeYourself = () => {
  const { gameStatusState, gameStatusDispatch } = useGameStatus();
  const { inputState, inputDispatch } = useInput();
  const { idxInfoState, idxInfoDispatch } = useIdxInfo();
  const { typeInfoState, typeInfoDispatch } = useTypeInfo();
  const { gameStatus, countdown, gameTimer } = gameStatusState;
  const { charsTyped, errors } = typeInfoState;
  const WPM = getNetWPM(gameStatus, gameTimer, charsTyped, errors);
  const time = getTime(gameStatus, gameTimer);
  const accuracy = getAccuracy(charsTyped, errors);

  const { chars, words } = gameStatusState;
  const { currInput, inputValid } = inputState;
  const { currCharIdx, currWordIdx } = idxInfoState;
  const handleSpace = () => {
    // Word in input matches the word at current word index
    if (currInput === words[currWordIdx]) {
      inputDispatch({ type: "reset_input" });
      idxInfoDispatch({ type: "reset_character_index" });
      idxInfoDispatch({ type: "increment_word_index" });
      typeInfoDispatch({ type: "increment_characters_typed" });
    }
    // Word in input does not match the word at current word index
    else {
      if (inputValid) {
        inputDispatch({ type: "add_character", payload: " " });
        idxInfoDispatch({ type: "increment_character_index" });
      }
      inputDispatch({ type: "set_valid", payload: false });
      typeInfoDispatch({ type: "increment_errors" });
    }
  };

  const handleBackspace = () => {
    if (!inputValid) inputDispatch({ type: "set_valid", payload: true });
    if (currInput !== "")
      idxInfoDispatch({ type: "decrement_character_index" });
  };

  const handleChar = (typedChar) => {
    const lastWord = words.slice(-1)[0];
    const lastChar = lastWord.slice(-1);
    const isOnLastChar =
      words.length - 1 === currWordIdx &&
      lastWord.length - 1 === currCharIdx + 1 &&
      lastChar === typedChar;

    // If user is on the very last character and it's correct, end the game
    if (isOnLastChar) {
      idxInfoDispatch({ type: "decrement_character_index" });
      idxInfoDispatch({ type: "increment_word_index" });
      gameStatusDispatch({ type: "end_game" });
    }
    // Evaluate the input character
    else {
      const charToCheck = words[idxInfoState.currWordIdx][currCharIdx + 1];

      if (typedChar !== charToCheck) {
        if (inputValid) {
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
    } else if (e.key !== "Shift" && inputValid) {
      handleChar(e.key);
    }
  };

  const onInputChange = (e) => {
    // If there is whitespace, do not concantenate it to currInput
    if (!/\s/.test(e.target.value))
      inputDispatch({ type: "set_input", payload: e.target.value });
  };

  const restart = () => {
    console.log("Restart game!");
    gameStatusDispatch({ type: "restart_game" });
    inputDispatch({ type: "reset_input" });
    idxInfoDispatch({ type: "reset_index_info" });
    typeInfoDispatch({ type: "reset_type_info" });
  };

  const { loadError, isLoading } = gameStatusState;
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
            <GameStatusInfo
              gameStatus={gameStatus}
              countdown={countdown}
              gameTimer={gameTimer}
            />
            <ProgressBar chars={chars} charsTyped={charsTyped} WPM={WPM} />

            {gameStatus !== "ended" && (
              <div className="singleplayer-typing-box">
                <Paragraph
                  gameStatus={gameStatus}
                  words={words}
                  currInput={currInput}
                  idxInfoState={idxInfoState}
                />
                <Input
                  gameStatus={gameStatus}
                  onKeyDown={onKeyDown}
                  onChange={onInputChange}
                  currInput={currInput}
                  inputValid={inputValid}
                />
              </div>
            )}
          </div>

          {gameStatus === "ended" && (
            <>
              <ButtonRow restart={restart} />
              <Statistics WPM={WPM} time={time} accuracy={accuracy} />
            </>
          )}
        </div>
      </section>
    );
  }
};

export default PracticeYourself;
