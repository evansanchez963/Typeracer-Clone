const getCharClass = (
  char,
  charIdx,
  wordIdx,
  gameStatus,
  currInput,
  idxInfo
) => {
  if (charIdx === idxInfo.currCharIdx && wordIdx === idxInfo.currWordIdx) {
    if (gameStatus.isStarted && !gameStatus.isEnded) {
      if (char === currInput.split("")[charIdx]) return "correct";
      else {
        return "incorrect";
      }
    }
  }
  // Put blinking cursor on active character.
  else if (
    charIdx === idxInfo.currCharIdx + 1 &&
    wordIdx === idxInfo.currWordIdx
  ) {
    if (gameStatus.isStarted && !gameStatus.isEnded) return "active-char";
  }
  // Set past characters on current word as correct.
  else if (wordIdx === idxInfo.currWordIdx && charIdx < idxInfo.currCharIdx) {
    return "correct";
  }
  // Set all past words as correct.
  else if (wordIdx < idxInfo.currWordIdx) {
    return "correct";
  }

  return "";
};

export default getCharClass;
