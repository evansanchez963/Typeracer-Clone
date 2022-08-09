const sendTextHandler = (socket) => {
  socket.on("send_text_data", (data) => {
    socket
      .to(data.room)
      .emit("recieve_text_data", { chars: data.chars, words: data.words });
  });
};

module.exports = sendTextHandler;
