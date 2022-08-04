const joinRoomHandler = require("../socketHandlers/joinRoomHandler");
const connectRoomHandler = require("../socketHandlers/connectRoomHandler");
const sendTextHandler = require("../socketHandlers/sendTextHandler");
const leaveRoomHandler = require("../socketHandlers/leaveRoomHandler");
const disconnectingHandler = require("../socketHandlers/disconnectingHandler");

const connectSocket = (socket, connectedClients, rooms) => {
  console.log(`User ${socket.id} connected`);

  joinRoomHandler(socket, connectedClients, rooms);
  connectRoomHandler(socket, connectedClients);
  sendTextHandler(socket);
  leaveRoomHandler(socket, connectedClients);
  disconnectingHandler(socket, connectedClients);
};

module.exports = connectSocket;
