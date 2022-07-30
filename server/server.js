require("dotenv").config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/error");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000" },
  methods: ["GET", "POST", "PUT", "DELETE"],
});
const port = 5000;

// Connect to database.
connectDB();

// Configure app to use express, cors, routers, and custom error handler.
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/user", require("./routes/userRouter"));
app.use(errorHandler);

// Socket.io event listeners.
io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(
      `User ${data.user} with ID ${socket.id} connected to room ${data.room}`
    );
  });

  socket.on("leave_room", (data) => {
    socket.leave(data.room);
    console.log(
      `User ${data.user} with ID ${socket.id} left room ${data.room}`
    );
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

server.listen(port, () => console.log(`Server is running on port: ${port}`));

process.on("unhandledRejection", (err) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
