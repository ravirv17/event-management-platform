import express from "express";
import { createEvent, getEvents, updateEvent, deleteEvent } from "../controllers/eventController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Event from "../models/Event.js";  // 🔹 Import Event model

const router = express.Router();

router.post("/", authMiddleware, createEvent);
router.get("/", getEvents);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

// 🔹 Add the new "Join Event" route here
router.post("/:id/join", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (!event.attendees.includes(req.user.id)) {
      event.attendees.push(req.user.id);
      await event.save();
    }

    res.json({ message: "Joined successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
