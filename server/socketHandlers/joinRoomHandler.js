const joinRoomHandler = (socket, connectedClients) => {
  socket.on("join_room", (data) => {
    socket.join(data.room);
    connectedClients[socket.id] = data.user;
    const clients = socket.adapter.rooms.get(data.room);
    console.log(
      `User ${data.user} with ID ${socket.id} connected to room ${data.room}`
    );
    console.log(`Connected users in room ${data.room}: ${clients.size}`);
    console.log(connectedClients);
  });
};

module.exports = joinRoomHandler;
