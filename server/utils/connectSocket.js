const joinRoomHandler = require("../socketHandlers/joinRoomHandler");
const leaveRoomHandler = require("../socketHandlers/leaveRoomHandler");
const disconnectHandler = require("../socketHandlers/disconnectHandler");

const connectSocket = (socket, connectedClients) => {
  console.log(`User ${socket.id} connected`);
  console.log(connectedClients);

  joinRoomHandler(socket);
  leaveRoomHandler(socket);
  disconnectHandler(socket);
};

module.exports = connectSocket;
