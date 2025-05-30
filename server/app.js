const express = require("express");
const bodyParser = require("body-parser");
const allRoutes = require("./routes/routing");
const path = require("path");
const connectDB = require("./database/database");
require("dotenv").config();

// s soumya
const axios = require("axios");
const rateLimit = require("express-rate-limit");
// e soumya

const app = express();

// JSON parsers
app.use(express.json());
app.use(bodyParser.json());

// s soumya
// Rate limiter for code execution
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});
// e soumya

// s soumya
app.use("/api/execute", (req, res, next) => {
  if (!req.body.code || typeof req.body.code !== "string") {
    return res.status(400).json({ error: "Invalid code payload" });
  }
  next();
});
// e soumya

// s soumya
app.post("/api/execute", apiLimiter, async (req, res) => {
  const { code, input, language = "cpp" } = req.body;

  try {
    const response = await axios.post(
      "https://onecompiler-apis.p.rapidapi.com/api/v1/run",
      {
        language,
        stdin: input,
        files: [
          {
            name: "main.cpp",
            content: code,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "onecompiler-apis.p.rapidapi.com",
        },
      }
    );

    res.json({
      success: true,
      output: response.data.stdout || response.data.stderr || "No output",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response?.data?.error || "Execution failed",
    });
  }
});
// e soumya

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
