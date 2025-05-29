const express = require("express");
const bodyParser = require("body-parser");
const allRoutes = require("./routes/routing");
const path = require("path");
const connectDB = require("./database/database");
require("dotenv").config();

const app = express();

// JSON parsers
app.use(express.json());
app.use(bodyParser.json());

// API routes
app.use("/", allRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "../build")));

// Create HTTP server and attach Socket.IO
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  },
});

// Make io available globally (or use a better dependency injection pattern)
global.io = io;

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

start();
