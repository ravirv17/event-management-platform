import { io } from "socket.io-client";

const socket = io("https://event-management-platform-3.onrender.com");

export default socket;
