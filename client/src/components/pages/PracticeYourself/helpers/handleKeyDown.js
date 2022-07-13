// Evaluate input when user types.
// If input is wrong, user can only backspace.
const handleKeyDown = (
  event,
  setGameStatus,
  textInfo,
  inputInfo,
  setInputInfo,
  idxInfo,
  setIdxInfo,
  setUserTypeInfo
) => {
  if (event.key === " ") {
    // Space evaluates word at current word index.

    if (inputInfo.currInput === textInfo.words[idxInfo.currWordIdx]) {
      setInputInfo((prev) => ({ ...prev, currInput: "" }));
      setIdxInfo((prev) => ({ ...prev, currCharIdx: -1 }));
      setIdxInfo((prev) => ({ ...prev, currWordIdx: prev.currWordIdx + 1 }));
      setUserTypeInfo((prev) => ({ ...prev, charsTyped: prev.charsTyped + 1 }));
    } else {
      if (inputInfo.inputValid) {
        setInputInfo((prev) => ({ ...prev, currInput: prev.currInput + " " }));
        setIdxInfo((prev) => ({ ...prev, currCharIdx: prev.currCharIdx + 1 }));
      }
      setInputInfo((prev) => ({ ...prev, inputValid: false }));
      setUserTypeInfo((prev) => ({ ...prev, errors: prev.errors + 1 }));
    }
  } else if (event.key === "Backspace") {
    if (!inputInfo.inputValid)
      setInputInfo((prev) => ({ ...prev, inputValid: true }));
    if (inputInfo.currInput !== "")
      setIdxInfo((prev) => ({ ...prev, currCharIdx: prev.currCharIdx - 1 }));
  } else {
    // Evaluate whether current typed character is correct.

    if (event.key !== "Shift" && inputInfo.inputValid) {
      const lastWord = textInfo.words[textInfo.words.length - 1];
      const lastWordChars = lastWord.split("");
      const lastChar = lastWordChars[lastWordChars.length - 1];

      // If user is on the very last character and it's correct,
      // clear input and end game. Else evaluate.
      if (
        textInfo.words.length - 1 === idxInfo.currWordIdx &&
        lastWordChars.length - 1 === idxInfo.currCharIdx + 1 &&
        lastChar === event.key
      ) {
        setIdxInfo((prev) => ({ ...prev, currCharIdx: -1 }));
        setIdxInfo((prev) => ({ ...prev, currWordIdx: prev.currWordIdx + 1 }));
        setGameStatus((prev) => ({ ...prev, isEnded: true }));
      } else {
        const charToCheck =
          textInfo.words[idxInfo.currWordIdx].split("")[
            idxInfo.currCharIdx + 1
          ];

        if (event.key !== charToCheck) {
          if (inputInfo.inputValid) {
            setInputInfo((prev) => ({
              ...prev,
              currInput: prev.currInput + event.key,
            }));
            setIdxInfo((prev) => ({
              ...prev,
              currCharIdx: prev.currCharIdx + 1,
            }));
          }
          setInputInfo((prev) => ({ ...prev, inputValid: false }));
          setUserTypeInfo((prev) => ({ ...prev, errors: prev.errors + 1 }));
        } else {
          setIdxInfo((prev) => ({
            ...prev,
            currCharIdx: prev.currCharIdx + 1,
          }));
          setUserTypeInfo((prev) => ({
            ...prev,
            charsTyped: prev.charsTyped + 1,
          }));
        }
      }
    }
  }
};

export default handleKeyDown;
