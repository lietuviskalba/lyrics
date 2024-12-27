// SongsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/songsPage.css";

const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // New state for loading

  // Fetch songs when the component loads
  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.error("Error fetching songs:", err);
        setLoading(false);
      });
  }, []);

  // Handle song click
  const handleSongClick = (song) => {
    // Increment the count on the backend
    fetch(`http://localhost:5000/api/songs/${song.id}/increment`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to increment count");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
        // Update local state to reflect the new count
        setSongs((prevSongs) =>
          prevSongs.map((s) =>
            s.id === song.id ? { ...s, count: s.count + 1 } : s
          )
        );
        // Navigate to LyricPage with selected song
        navigate("/lyrics", {
          state: { selectedSong: { ...song, count: data.count } }, // Use data.count from the response
        });
      })
      .catch((err) => {
        console.error("Error incrementing count:", err);
        alert("Failed to select the song. Please try again.");
      });
  };

  // Filter songs based on search term
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="songs-page">
      <h1>All Songs</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search songs by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search songs by name"
        />
      </div>
      {loading ? (
        <p>Loading songs...</p>
      ) : (
        <ul className="song-list">
          {filteredSongs.map((song) => (
            <li
              key={song.id}
              onClick={() => handleSongClick(song)}
              className="song-item"
              tabIndex="0" // Makes the item focusable
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSongClick(song);
                }
              }}
            >
              <div className="song-box">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SongsPage;
