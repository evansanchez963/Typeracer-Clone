const getActiveRooms = require("../utils/getActiveRooms");
const getUserRoster = require("../utils/getUserRoster");

// Socketio events for managing room state and displaying who is in what room.
const roomStateHandler = (socket, connectedClients, rooms) => {
  socket.on("send_start_room", (data) => {
    socket.emit("recieve_start_room", { startRoom: data.startRoom });
    socket
      .to(data.room)
      .emit("recieve_start_room", { startRoom: data.startRoom });
  });

  socket.on("send_end_room", (data) => {
    socket.emit("recieve_end_room", { endRoom: data.endRoom });
    socket.to(data.room).emit("recieve_end_room", { endRoom: data.endRoom });
  });

  socket.on("join_room", (data) => {
    // Make sure room that user is connecting to does not have more than two clients.
    const activeRooms = getActiveRooms(rooms);

    if (
      activeRooms.hasOwnProperty(data.room) &&
      activeRooms[data.room].size === 2
    ) {
      socket.emit("join_room_error", "This room is full.");

      console.log(`Room ${data.room} is full.`);
    } else {
      socket.join(data.room);
      connectedClients[socket.id] = data.user;
      socket.emit("join_room_success", { room: data.room });

      console.log(
        `User ${data.user} with ID ${socket.id} connected to room ${data.room}.`
      );
    }
  });

  socket.on("connect_to_room", (data) => {
    // Emit connected clients info to everyone in a room.
    const connectedClientsInfo = getUserRoster(socket, connectedClients, data);
    socket.emit("get_user_roster", connectedClientsInfo); // Emit info to sender.
    socket.to(data.room).emit("get_user_roster", connectedClientsInfo); // Emit info to others in room.
  });

  socket.on("leave_room", (data) => {
    socket.leave(data.room);
    delete connectedClients[socket.id];

    const connectedClientsInfo = getUserRoster(socket, connectedClients, data);
    socket.to(data.room).emit("get_user_roster", connectedClientsInfo); // Emit info of user that left to others in room.

    console.log(
      `User ${data.user} with ID: ${socket.id} left room ${data.room}.`
    );
  });

  socket.on("disconnecting", () => {
    const rooms = socket.rooms;
    delete connectedClients[socket.id];

    // Inform clients in the room that the user was in that the user disconnected.
    if (rooms.size === 2) {
      // Assume that a user can only be connected to one room.
      const [, room] = rooms;

      socket.leave(room);
      const connectedClientsInfo = getUserRoster(socket, connectedClients, {
        room: room,
      });
      socket.to(room).emit("get_user_roster", connectedClientsInfo); // Emit info of user that disconnected to others in room.
    }

    console.log(`User ${socket.id} disconnected.`);
  });
};

module.exports = roomStateHandler;
