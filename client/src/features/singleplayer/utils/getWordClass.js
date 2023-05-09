const getWordClass = (wordIdx, gameStatus, idxInfoState) => {
  // Underline the word that the user is currently on
  if (gameStatus === "started") {
    if (wordIdx === idxInfoState.currWordIdx) return "singleplayer-active-word";
  }
  return "";
};

export default getWordClass;
