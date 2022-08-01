const getActiveRooms = (rooms) => {
  const roomsObj = {};
  const arr = Array.from(rooms);
  const filtered = arr.filter((room) => !room[1].has(room[0]));

  for (let i = 0; i < filtered.length; i += 1) {
    roomsObj[filtered[i][0]] = filtered[i][1];
  }

  return roomsObj;
};

module.exports = getActiveRooms;
