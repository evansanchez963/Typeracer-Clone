const disconnectHandler = (socket, connectedClients) => {
  socket.on("disconnect", () => {
    delete connectedClients[socket.id];
    console.log(`User ${socket.id} disconnected`);
  });
  console.log(connectedClients);
};

module.exports = disconnectHandler;
