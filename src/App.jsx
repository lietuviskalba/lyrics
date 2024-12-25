import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SongsPage from "./pages/SongsPage.jsx";
import LyricPage from "./pages/LyricPage";
import AdminPage from "./pages/AdminPage";

import "./styles/reset.css";
import "./styles/styles.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LyricPage />} />
        <Route path="/songs" element={<SongsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/lyrics" element={<LyricPage />} />
      </Routes>
    </Router>
  );
};

export default App;
