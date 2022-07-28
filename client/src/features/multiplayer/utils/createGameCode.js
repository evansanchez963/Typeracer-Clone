const createGameCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let gameCode = "";

  for (let i = 0; i < 5; i += 1) {
    gameCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return gameCode;
};

export default createGameCode;
