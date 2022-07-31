const leaveRoomHandler = (socket, connectedClients) => {
  socket.on("leave_room", (data) => {
    socket.leave(data.room);
    delete connectedClients[socket.id];
    console.log(
      `User ${data.user} with ID ${socket.id} left room ${data.room}`
    );
    console.log(connectedClients);
  });
};

module.exports = leaveRoomHandler;
