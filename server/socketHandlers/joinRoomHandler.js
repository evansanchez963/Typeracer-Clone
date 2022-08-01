const joinRoomHandler = (socket, connectedClients) => {
  socket.on("join_room", (data) => {
    socket.join(data.room);
    connectedClients[socket.id] = data.user;

    console.log(
      `User ${data.user} with ID ${socket.id} connected to room ${data.room}`
    );
  });
};

module.exports = joinRoomHandler;
