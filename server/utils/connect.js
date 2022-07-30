const connect = (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(
      `User ${data.user} with ID ${socket.id} connected to room ${data.room}`
    );
  });

  socket.on("leave_room", (data) => {
    socket.leave(data.room);
    console.log(
      `User ${data.user} with ID ${socket.id} left room ${data.room}`
    );
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
};

module.exports = connect;
