import API from "./api";

export const getEvents = async () => {
  const { data } = await API.get("/events");
  return data;
};

export const createEvent = async (eventData, token) => {
  const { data } = await API.post("/events", eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteEvent = async (eventId, token) => {
  await API.delete(`/events/${eventId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
