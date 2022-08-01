const getUserRoster = (socket, connectedClients, data) => {
  let connectedClientsInfo = {};
  const clients = socket.adapter.rooms.get(data.room);
  if (clients) {
    clients.forEach((client) => {
      connectedClientsInfo[client] = connectedClients[client];
    });
  }

  return connectedClientsInfo;
};

module.exports = getUserRoster;
