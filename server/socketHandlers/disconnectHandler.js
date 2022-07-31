const disconnectHandler = (socket) => {
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
};

module.exports = disconnectHandler;
