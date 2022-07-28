const getWordClass = (wordIdx, gameStatus, idxInfo) => {
  // Underline the word that the user is currently on.
  if (gameStatus.isStarted && !gameStatus.isEnded) {
    if (wordIdx === idxInfo.currWordIdx) return "active-word";
  }
  return "";
};

export default getWordClass;
