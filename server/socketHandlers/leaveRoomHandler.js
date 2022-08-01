const getUserRoster = require("../utils/getUserRoster");

const leaveRoomHandler = (socket, connectedClients) => {
  socket.on("leave_room", (data) => {
    socket.leave(data.room);
    delete connectedClients[socket.id];

    const connectedClientsInfo = getUserRoster(socket, connectedClients, data);
    socket.to(data.room).emit("get_user_roster", connectedClientsInfo); // Emit info of user that left to others in room.

    console.log(
      `User ${data.user} with ID ${socket.id} left room ${data.room}`
    );
  });
};

module.exports = leaveRoomHandler;
