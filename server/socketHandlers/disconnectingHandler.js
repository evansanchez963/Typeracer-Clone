const getUserRoster = require("../utils/getUserRoster");

const disconnectingHandler = (socket, connectedClients) => {
  socket.on("disconnecting", () => {
    const rooms = socket.rooms;
    delete connectedClients[socket.id];

    // Inform clients in the room that the user was in that the user disconnected.
    if (rooms.size === 2) {
      // Assume that a user can only be connected to one room.
      const [, room] = rooms;

      const connectedClientsInfo = getUserRoster(socket, connectedClients, {
        room: room,
      });
      socket.to(room).emit("get_user_roster", connectedClientsInfo); // Emit info of user that disconnected to others in room.
    }

    console.log(`User ${socket.id} disconnected`);
  });
};

module.exports = disconnectingHandler;
