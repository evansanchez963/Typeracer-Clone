const joinRoomHandler = require("../socketHandlers/joinRoomHandler");
const connectRoomHandler = require("../socketHandlers/connectRoomHandler");
const roomStateHandler = require("../socketHandlers/roomStateHandler");
const sendTimerStateHandler = require("../socketHandlers/sendTimerStateHandler");
const sendTextHandler = require("../socketHandlers/sendTextHandler");
const sendProgressHandler = require("../socketHandlers/sendProgressHandler");
const leaveRoomHandler = require("../socketHandlers/leaveRoomHandler");
const disconnectingHandler = require("../socketHandlers/disconnectingHandler");

const connectSocket = (socket, connectedClients, rooms) => {
  console.log(`User ${socket.id} connected`);

  joinRoomHandler(socket, connectedClients, rooms);
  connectRoomHandler(socket, connectedClients);
  roomStateHandler(socket);
  sendTimerStateHandler(socket);
  sendTextHandler(socket);
  sendProgressHandler(socket);
  leaveRoomHandler(socket, connectedClients);
  disconnectingHandler(socket, connectedClients);
};

module.exports = connectSocket;
