const getWordClass = (wordIdx, clientStatus, idxInfo) => {
  // Underline the word that the user is currently on.
  if (clientStatus.isClientStarted && !clientStatus.isClientEnded) {
    if (wordIdx === idxInfo.currWordIdx) return "multiplayer-active-word";
  }
  return "";
};

export default getWordClass;
