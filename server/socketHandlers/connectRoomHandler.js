const getUserRoster = require("../utils/getUserRoster");

const connectRoomHandler = (socket, connectedClients) => {
  socket.on("connect_to_room", (data) => {
    // Emit connected clients info to everyone in a room.
    const connectedClientsInfo = getUserRoster(socket, connectedClients, data);
    socket.emit("get_user_roster", connectedClientsInfo); // Emit info to sender.
    socket.to(data.room).emit("get_user_roster", connectedClientsInfo); // Emit info to others in room.
  });
};

module.exports = connectRoomHandler;
