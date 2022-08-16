// Socketio events to handle the restart game functionality in a room.
const clientStateHandler = (socket) => {
  socket.on("send_client_ready", (data) => {
    socket.emit("recieve_client_ready", { socketId: socket.id });
    socket.to(data.room).emit("recieve_client_ready", { socketId: socket.id });
  });

  socket.on("send_client_finish", (data) => {
    socket.emit("recieve_client_finish", { socketId: socket.id });
    socket.to(data.room).emit("recieve_client_finish", { socketId: socket.id });
  });
};

module.exports = clientStateHandler;
