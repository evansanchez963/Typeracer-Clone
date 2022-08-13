const readyClientHandler = (socket) => {
  socket.on("send_client_ready", (data) => {
    socket.emit("recieve_client_ready", { socketId: socket.id });
    socket.to(data.room).emit("recieve_client_ready", { socketId: socket.id });
  });
};

module.exports = readyClientHandler;
