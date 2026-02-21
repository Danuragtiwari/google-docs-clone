const mongoose = require("mongoose");
const express = require('express');
const http = require("http");
const socketIO = require('socket.io');
const cors = require("cors");

console.log("Starting server...");

const app = express();
app.use(express.json());
app.use(cors());

console.log("Creating HTTP server...");
const server = http.createServer(app);

console.log("Initializing Socket.IO...");
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    transports: ["websocket", "polling"]
});

console.log("Connecting to MongoDB...");
const mongoUri = process.env.MONGODB_URI || "mongodb+srv://piyush09:qTMy38x22hXofIyI@cluster0.1bqc8.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUri)
    .then(() => {
        console.log("✅ DB connected");
    })
    .catch(err => {
        console.error("❌ MongoDB connection error:", err.message);
    });

// Health check endpoint
app.get("/", (req, res) => {
    console.log("GET / called");
    res.status(200).json({ 
        message: "Backend is running", 
        status: "ok", 
        timestamp: new Date() 
    });
});

// Test Socket.IO endpoint
app.get("/health", (req, res) => {
    console.log("GET /health called");
    res.status(200).json({ 
        status: "healthy",
        uptime: process.uptime()
    });
});

console.log("Setting up Socket.IO...");
io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);
    socket.emit("connected", { message: "Socket.IO connected" });
});

const PORT = process.env.PORT || 8080;

console.log(`Starting server on port ${PORT}...`);
server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

server.on('error', (err) => {
    console.error("❌ Server error:", err);
});

process.on('unhandledRejection', (err) => {
    console.error("❌ Unhandled rejection:", err);
});


