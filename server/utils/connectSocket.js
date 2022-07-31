const joinRoomHandler = require("../socketHandlers/joinRoomHandler");
const leaveRoomHandler = require("../socketHandlers/leaveRoomHandler");
const disconnectHandler = require("../socketHandlers/disconnectHandler");

const connectSocket = (socket, connectedClients) => {
  console.log(`User ${socket.id} connected`);

  joinRoomHandler(socket, connectedClients);
  leaveRoomHandler(socket, connectedClients);
  disconnectHandler(socket, connectedClients);
};

module.exports = connectSocket;
