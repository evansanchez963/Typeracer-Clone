// Evaluate input when user types.
// If input is wrong, user can only backspace.

import { GameStatusInfo } from "../components";

const handleKeyDown = (
  e,
  gameStatus,
  textInfo,
  inputInfo,
  idxInfo,
  typeInfo
) => {
  if (e.key === " ") {
    // Space evaluates word at current word index.

    if (inputInfo.currInput === textInfo.words[idxInfo.currWordIdx]) {
      inputInfo.setCurrInput("");
      idxInfo.decCharIdx();
      idxInfo.incWordIdx();
      typeInfo.incCharsTyped();
    } else {
      if (inputInfo.inputValid) {
        inputInfo.setCurrInput(inputInfo.currInput + " ");
        idxInfo.incCharIdx();
      }
      inputInfo.setInputValid(false);
      typeInfo.incErrors();
    }
  } else if (e.key === "Backspace") {
    if (!inputInfo.inputValid) inputInfo.setInputValid(true);
    if (inputInfo.currInput !== "") idxInfo.decCharIdx();
  } else {
    // Evaluate whether current typed character is correct.

    if (e.key !== "Shift" && inputInfo.inputValid) {
      const lastWord = textInfo.words[textInfo.words.length - 1];
      const lastWordChars = lastWord.split("");
      const lastChar = lastWordChars[lastWordChars.length - 1];

      // If user is on the very last character and it's correct,
      // clear input and end game. Else evaluate.
      if (
        textInfo.words.length - 1 === idxInfo.currWordIdx &&
        lastWordChars.length - 1 === idxInfo.currCharIdx + 1 &&
        lastChar === e.key
      ) {
        idxInfo.decCharIdx();
        idxInfo.incWordIdx();
        gameStatus.endGame();
      } else {
        const charToCheck =
          textInfo.words[idxInfo.currWordIdx].split("")[
            idxInfo.currCharIdx + 1
          ];

        if (e.key !== charToCheck) {
          if (inputInfo.inputValid) {
            inputInfo.setCurrInput(inputInfo.currInput + e.key);
            idxInfo.incCharIdx();
          }
          inputInfo.setInputValid(false);
          typeInfo.incErrors();
        } else {
          idxInfo.incCharIdx();
          typeInfo.incCharsTyped();
        }
      }
    }
  }
};

export default handleKeyDown;
