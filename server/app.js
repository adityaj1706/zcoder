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

// Behind a proxy on hosted platforms (Vercel) - needed for correct client IPs in the rate limiter
app.set("trust proxy", 1);

// Make sure MongoDB is connected before handling API requests.
// The connection promise is cached so serverless invocations reuse it.
let dbPromise = null;
const ensureDB = () => {
  if (!dbPromise) {
    dbPromise = connectDB(process.env.MONGO_URL).catch((err) => {
      dbPromise = null;
      throw err;
    });
  }
  return dbPromise;
};

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
app.use("/api", async (req, res, next) => {
  // The problem list is served from a JSON file and doesn't need the database
  if (req.path.startsWith("/problems")) return next();
  try {
    await ensureDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ message: "Database connection failed" });
  }
}, allRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "../build")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
})

const port = process.env.PORT || 3000;

// Local / traditional server: HTTP server with Socket.IO attached
const start = async () => {
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

  try {
    await ensureDB();
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

// Run a normal server locally (`npm start` in /server); on Vercel the app is
// imported by api/index.js as a serverless function instead.
if (require.main === module) {
  start();
}

module.exports = app;
