const sendTimerStateHandler = (socket) => {
  socket.on("send_timer_state", (data) => {
    socket
      .to(data.room)
      .emit("recieve_timer_state", { timerState: data.timerState });
  });
};

module.exports = sendTimerStateHandler;
