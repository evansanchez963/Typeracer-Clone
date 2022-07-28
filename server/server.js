require("dotenv").config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/error");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: process.env.CLIENT_URL },
  methods: ["GET", "POST", "PUT", "DELETE"],
});
const port = process.env.SERVER_PORT || 5000;

// Connect to database.
connectDB();

// Configure app to use express, cors, routers, and custom error handler.
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/user", require("./routes/userRouter"));
app.use(errorHandler);

// Socket.io functions
io.on("connection", (socket) => {
  console.log(`User connected with ID ${socket.id}`);
});

server.listen(port, () => console.log(`Server is running on port: ${port}`));

process.on("unhandledRejection", (err) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
