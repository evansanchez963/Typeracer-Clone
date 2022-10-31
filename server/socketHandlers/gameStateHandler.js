// Socketio events for handling the host sending game state data to others in the same room.
const gameStateHandler = (socket) => {
  socket.on("send_text_data", (data) => {
    socket
      .to(data.room)
      .emit("recieve_text_data", { chars: data.chars, words: data.words });
  });

  socket.on("send_timer_state", (data) => {
    socket
      .to(data.room)
      .emit("recieve_timer_state", { timerState: data.timerState });
  });

  socket.on("send_progress_data", (data) => {
    socket.to(data.room).emit(`recieve_${socket.id}_progress`, {
      charsTyped: data.charsTyped,
      WPM: data.WPM,
    });
  });
};

module.exports = gameStateHandler;
