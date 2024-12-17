import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SongPage from "./pages/SongPage";
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
          <Route path="/" element={<SongPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
