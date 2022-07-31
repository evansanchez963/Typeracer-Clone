const leaveRoomHandler = (socket) => {
  socket.on("leave_room", (data) => {
    socket.leave(data.room);
    console.log(
      `User ${data.user} with ID ${socket.id} left room ${data.room}`
    );
  });
};

module.exports = leaveRoomHandler;
