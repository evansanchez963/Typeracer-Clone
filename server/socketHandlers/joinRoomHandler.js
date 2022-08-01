const getActiveRooms = require("../utils/getActiveRooms");

const joinRoom = (socket, connectedClients, data) => {
  socket.join(data.room);
  connectedClients[socket.id] = data.user;
  socket.emit("join_room_success", { room: data.room });

  console.log(
    `User ${data.user} with ID ${socket.id} connected to room ${data.room}`
  );
};

const joinRoomHandler = (socket, connectedClients, rooms) => {
  socket.on("join_room", (data) => {
    // Make sure room that user is connecting to does not have more than two clients.
    const activeRooms = getActiveRooms(rooms);

    if (activeRooms.hasOwnProperty(data.room)) {
      if (activeRooms[data.room].size === 2) {
        socket.emit("join_room_error", "This room is full.");

        console.log(`Room ${data.room} is full.`);
      } else {
        joinRoom(socket, connectedClients, data);
      }
    } else {
      joinRoom(socket, connectedClients, data);
    }
  });
};

module.exports = joinRoomHandler;
