// LyricPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaColumns, FaList } from "react-icons/fa";
import "../styles/lyricPage.css";

const LyricPage = () => {
  const location = useLocation();
  const [selectedSong, setSelectedSong] = useState(
    location.state?.selectedSong || null
  );

  // Initialize columnCount and textSize with localStorage or defaults
  const [columnCount, setColumnCount] = useState(() => {
    const saved = localStorage.getItem("columnCount");
    return saved ? parseInt(saved, 10) : 1;
  });

  const [textSize, setTextSize] = useState(() => {
    const saved = localStorage.getItem("textSize");
    return saved ? parseInt(saved, 10) : 16;
  });

  // Persist columnCount to localStorage
  useEffect(() => {
    localStorage.setItem("columnCount", columnCount);
  }, [columnCount]);

  // Persist textSize to localStorage
  useEffect(() => {
    localStorage.setItem("textSize", textSize);
  }, [textSize]);

  // Handler to toggle column count
  const toggleColumns = () => {
    setColumnCount((prevCount) => (prevCount === 1 ? 2 : 1));
  };

  // Handler to adjust text size
  const handleTextSizeChange = (e) => {
    setTextSize(e.target.value);
  };

  // Fetch the song details if no song is selected
  useEffect(() => {
    if (!selectedSong) {
      fetch("http://localhost:5000/api/songs")
        .then((res) => res.json())
        .then((songs) => {
          if (songs.length > 0) {
            setSelectedSong(songs[0]);
          }
        })
        .catch((err) => console.error("Error fetching songs:", err));
    }
  }, [selectedSong]);

  if (!selectedSong) return <p>Loading song...</p>;

  // Function to render lyrics with stanza separators
  const renderLyrics = (lyrics) => {
    const stanzas = [];
    let currentStanza = [];

    lyrics.forEach((line, index) => {
      if (line.trim() === "") {
        if (currentStanza.length > 0) {
          stanzas.push(currentStanza);
          currentStanza = [];
        }
      } else {
        currentStanza.push(line);
      }
    });

    // Push the last stanza if exists
    if (currentStanza.length > 0) {
      stanzas.push(currentStanza);
    }

    return stanzas.map((stanza, index) => (
      <div key={index} className="stanza">
        {stanza.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
        {/* Add a horizontal line after each stanza except the last */}
        {index < stanzas.length - 1 && <hr className="stanza-separator" />}
      </div>
    ));
  };

  return (
    <div className="lyric-page">
      <div className="lyric-page-header">
        <div>
          <h2>{selectedSong.title}</h2>
          <h3>{selectedSong.artist}</h3>
        </div>
        <div className="lyric-page-controls">
          {/* Column Toggle Button */}
          <button
            onClick={toggleColumns}
            className="control-button"
            title="Toggle Columns"
            aria-label="Toggle between single and double column layout"
          >
            {columnCount === 1 ? <FaColumns /> : <FaList />}
          </button>

          {/* Text Size Slider */}
          <div className="text-size-control">
            <label htmlFor="text-size-slider">Text Size</label>
            <input
              type="range"
              id="text-size-slider"
              min="12"
              max="24"
              value={textSize}
              onChange={handleTextSizeChange}
            />
          </div>
        </div>
      </div>

      <div
        className={`lyrics columns-${columnCount}`}
        style={{ fontSize: `${textSize}px` }}
      >
        {renderLyrics(selectedSong.lyrics)}
      </div>

      <p className="date-added">Added on: {selectedSong.date_lyrics_added}</p>
    </div>
  );
};

export default LyricPage;
