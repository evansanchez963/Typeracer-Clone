const roomStateHandler = require("../socketHandlers/roomStateHandler");
const gameStateHandler = require("../socketHandlers/gameStateHandler");
const clientStateHandler = require("../socketHandlers/clientStateHandler");

const connectSocket = (socket, connectedClients, rooms) => {
  console.log(`User ${socket.id} connected`);

  roomStateHandler(socket, connectedClients, rooms);
  gameStateHandler(socket);
  clientStateHandler(socket);
};

module.exports = connectSocket;
