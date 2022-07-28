const getWordClass = (wordIdx, gameStatus, idxInfo) => {
  if (gameStatus.isStarted && !gameStatus.isEnded) {
    if (wordIdx === idxInfo.currWordIdx) return "active-word";
  }
  return "";
};

export default getWordClass;
