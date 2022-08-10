const sendProgressHandler = (socket) => {
  socket.on("send_progress_data", (data) => {
    socket
      .to(data.room)
      .emit(`recieve_${socket.id}_progress`, {
        charsTyped: data.charsTyped,
        WPM: data.WPM,
      });
  });
};

module.exports = sendProgressHandler;
