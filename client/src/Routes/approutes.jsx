import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Home from "../Components/home";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
