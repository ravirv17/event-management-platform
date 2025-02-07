import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

const app = express();
const server = createServer(app);  // Create an HTTP server
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// 🔹 WebSocket Connection
io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  socket.on("joinEvent", (eventId) => {
    socket.join(eventId);
    console.log(`📢 User joined event: ${eventId}`);
  });

  socket.on("newAttendee", (eventId) => {
    io.to(eventId).emit("updateAttendees");
    console.log(`🔄 Updating attendees for event: ${eventId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
