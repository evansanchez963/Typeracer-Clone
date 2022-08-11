const sendClientFinishHandler = (socket) => {
  socket.on("send_client_finish", (data) => {
    socket.emit("recieve_client_finish", { socketId: socket.id });
    socket.to(data.room).emit("recieve_client_finish", { socketId: socket.id });
  });
};

module.exports = sendClientFinishHandler;
