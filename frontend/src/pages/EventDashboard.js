import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";
import socket from "../services/socket";
import API from "../services/api";

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsData = await getEvents();
      setEvents(eventsData);
    };

    fetchEvents();

    socket.on("updateAttendees", fetchEvents);

    return () => {
      socket.off("updateAttendees");
    };
  }, []);

  const handleJoinEvent = async (eventId) => {
    try {
      await API.post(`/events/${eventId}/join`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 🔹 Notify others about the new attendee
      socket.emit("newAttendee", eventId);
    } catch (error) {
      alert("Error joining event");
    }
  };

  return (
    <div>
      <h2>Event Dashboard</h2>
      {events.map(event => (
        <div key={event._id}>
          <h3>{event.name}</h3>
          <p>{event.description}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <p>Attendees: {event.attendees.length}</p>
          <button onClick={() => handleJoinEvent(event._id)}>Join Event</button>
        </div>
      ))}
    </div>
  );
};

export default EventDashboard;
