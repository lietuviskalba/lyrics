import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const LyricPage = () => {
  const location = useLocation();
  const [selectedSong, setSelectedSong] = useState(
    location.state?.selectedSong || null
  );

  // Fetch the full song list if no song is selected
  useEffect(() => {
    if (!selectedSong) {
      fetch("http://localhost:5000/api/songs")
        .then((res) => res.json())
        .then((songs) => setSelectedSong(songs[0])) // Default to the first song
        .catch((err) => console.error("Error fetching songs:", err));
    }
  }, [selectedSong]);

  if (!selectedSong) return <p>Loading song...</p>;

  return (
    <div className="song-details">
      <h2>{selectedSong.title}</h2>
      <h3>{selectedSong.artist}</h3>
      <pre className="lyrics">{selectedSong.lyrics.join("\n")}</pre>
    </div>
  );
};

export default LyricPage;
