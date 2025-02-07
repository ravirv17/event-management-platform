import axios from "axios";

const API = axios.create({
  baseURL: "https://event-management-platform-2.onrender.com/api",
});

export default API;
