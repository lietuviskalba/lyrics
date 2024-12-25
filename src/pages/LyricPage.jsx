import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/lyricPage.css";

const LyricPage = () => {
  const location = useLocation();
  const [selectedSong, setSelectedSong] = useState(
    location.state?.selectedSong || null
  );

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
      <h2>{selectedSong.title}</h2>
      <h3>{selectedSong.artist}</h3>
      <div className="lyrics">{renderLyrics(selectedSong.lyrics)}</div>
      <p className="date-added">Added on: {selectedSong.date_lyrics_added}</p>
    </div>
  );
};

export default LyricPage;
