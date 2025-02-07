import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import EventDashboard from "./pages/EventDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventDashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
