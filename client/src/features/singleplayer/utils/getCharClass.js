const getCharClass = (paragraphInfo, gameStatus, currInput, idxInfoState) => {
  if (gameStatus !== "started") return "";

  if (
    paragraphInfo.charIdx === idxInfoState.currCharIdx &&
    paragraphInfo.wordIdx === idxInfoState.currWordIdx
  ) {
    if (paragraphInfo.char === currInput.split("")[paragraphInfo.charIdx])
      return "singleplayer-correct";
    else {
      return "singleplayer-incorrect";
    }
  }
  // Put blinking cursor on active character
  else if (
    paragraphInfo.charIdx === idxInfoState.currCharIdx + 1 &&
    paragraphInfo.wordIdx === idxInfoState.currWordIdx
  ) {
    return "singleplayer-active-char";
  }
  // Set past characters on current word as correct
  else if (
    paragraphInfo.wordIdx === idxInfoState.currWordIdx &&
    paragraphInfo.charIdx < idxInfoState.currCharIdx
  ) {
    return "singleplayer-correct";
  }
  // Set all past words as correct
  else if (paragraphInfo.wordIdx < idxInfoState.currWordIdx) {
    return "singleplayer-correct";
  }

  return "";
};

export default getCharClass;
