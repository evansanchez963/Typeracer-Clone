const roomStateHandler = (socket) => {
  socket.on("send_start_room", (data) => {
    socket.emit("recieve_start_room", { startRoom: data.startRoom });
    socket
      .to(data.room)
      .emit("recieve_start_room", { startRoom: data.startRoom });
  });

  socket.on("send_end_room", (data) => {
    socket.emit("recieve_end_room", { endRoom: data.endRoom });
    socket.to(data.room).emit("recieve_end_room", { endRoom: data.endRoom });
  });
};

module.exports = roomStateHandler;
