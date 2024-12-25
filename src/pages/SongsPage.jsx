import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  // Fetch songs when the component loads
  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  // Handle song click
  const handleSongClick = (song) => {
    navigate("/", { state: { selectedSong: song } }); // Pass selected song to the Lyrics page
  };

  return (
    <div className="songs-page">
      <h1>All Songs</h1>
      <ul className="song-list">
        {songs.map((song) => (
          <li
            key={song.id}
            onClick={() => handleSongClick(song)}
            className="song-item"
          >
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongsPage;
