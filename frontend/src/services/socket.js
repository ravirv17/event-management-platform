import { io } from "socket.io-client";

const socket = io("https://event-management-platform-2.onrender.com");

export default socket;
