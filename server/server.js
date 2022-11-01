require("dotenv").config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/error");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "https://typeracer-clone-frontend.onrender.com" },
  methods: ["GET", "POST", "PUT", "DELETE"],
});
const connectSocket = require("./utils/connectSocket");

// Connect to database.
connectDB();

// Configure app to use express, cors, routers, and custom error handler.
app.use(express.json());
app.use(
  cors({
    origin: "https://typeracer-clone-frontend.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/user", require("./routes/userRouter"));
app.use(errorHandler);

// Socket.io event listeners.
const connectedClients = {}; // Keeps track of clients connected to a room.
const rooms = io.sockets.adapter.rooms; // Keeps track of all existing rooms on the server.
io.on("connection", (socket) => connectSocket(socket, connectedClients, rooms));

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));

process.on("unhandledRejection", (err) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
