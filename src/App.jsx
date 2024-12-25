import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SongsPage from "./pages/SongsPage.jsx";
import LyricPage from "./pages/LyricPage";
import AdminPage from "./pages/AdminPage";
import SongList from "./components/SongList";
import SongDetails from "./components/SongDetails";
import songs from "./data/songs.json";
import "./styles.css";

const App = () => {
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LyricPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/songs" element={<SongsPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
