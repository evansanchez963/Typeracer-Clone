const getCharClass = (
  char,
  charIdx,
  wordIdx,
  clientStatus,
  currInput,
  idxInfo
) => {
  if (charIdx === idxInfo.currCharIdx && wordIdx === idxInfo.currWordIdx) {
    if (clientStatus.isClientStarted && !clientStatus.isClientEnded) {
      if (char === currInput.split("")[charIdx]) return "multiplayer-correct";
      else {
        return "multiplayer-incorrect";
      }
    }
  }
  // Put blinking cursor on active character.
  else if (
    charIdx === idxInfo.currCharIdx + 1 &&
    wordIdx === idxInfo.currWordIdx
  ) {
    if (clientStatus.isClientStarted && !clientStatus.isClientEnded)
      return "multiplayer-active-char";
  }
  // Set past characters on current word as correct.
  else if (wordIdx === idxInfo.currWordIdx && charIdx < idxInfo.currCharIdx) {
    return "multiplayer-correct";
  }
  // Set all past words as correct.
  else if (wordIdx < idxInfo.currWordIdx) {
    return "multiplayer-correct";
  }

  return "";
};

export default getCharClass;
