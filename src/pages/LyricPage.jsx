// src/pages/LyricPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaColumns, FaList, FaRandom } from "react-icons/fa"; // Import FaRandom
import {
  LyricPageContainer,
  LyricPageHeader,
  SongDetails,
  LyricPageControls,
  ControlButton,
  RandomButton, // Import RandomButton
  TextSizeControl,
  TextSizeLabel,
  TextSizeSlider,
  LyricsContainer,
  Stanza,
  StanzaParagraph,
  StanzaSeparator,
  DateAdded,
} from "./LyricPage.styled";

const LyricPage = () => {
  const location = useLocation();
  const [selectedSong, setSelectedSong] = useState(
    location.state?.selectedSong || null
  );
  const [songs, setSongs] = useState([]); // New state for songs list

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

  // Utility to format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd}-${hh}:${min}`;
  };

  // Fetch the song details if no song is selected
  useEffect(() => {
    if (!selectedSong) {
      fetch("http://localhost:5000/api/songs")
        .then((res) => res.json())
        .then((songsData) => {
          if (songsData.length > 0) {
            setSongs(songsData); // Store songs in state
            setSelectedSong(songsData[0]);
          }
        })
        .catch((err) => console.error("Error fetching songs:", err));
    } else {
      // If a song is already selected (e.g., via navigation), fetch all songs to have access for random selection
      fetch("http://localhost:5000/api/songs")
        .then((res) => res.json())
        .then((songsData) => setSongs(songsData))
        .catch((err) => console.error("Error fetching songs:", err));
    }
  }, [selectedSong]);

  // Handler to toggle column count
  const toggleColumns = () => {
    setColumnCount((prevCount) => (prevCount === 1 ? 2 : 1));
  };

  // Handler to adjust text size
  const handleTextSizeChange = (e) => {
    setTextSize(e.target.value);
  };

  // Handler to load a random song
  const getRandomSong = () => {
    if (songs.length === 0) return;
    if (songs.length === 1) return; // Only one song available

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (songs[randomIndex].id === selectedSong.id);

    setSelectedSong(songs[randomIndex]);
  };

  // Handler for song item click (navigate to another page or other actions)
  const handleSongClick = (song) => {
    // Implement navigation to lyric page or other desired behavior
    // For example:
    window.location.href = `/lyrics/${song.id}`;
  };

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
      <Stanza key={index}>
        {stanza.map((line, idx) => (
          <StanzaParagraph key={idx}>{line}</StanzaParagraph>
        ))}
        {/* Add a horizontal line after each stanza except the last */}
        {index < stanzas.length - 1 && <StanzaSeparator />}
      </Stanza>
    ));
  };

  // Handle cases where no songs are available
  if (songs.length === 0) {
    return (
      <LyricPageContainer>
        <p>No songs available.</p>
      </LyricPageContainer>
    );
  }

  // If no selectedSong is set after fetching, show loading
  if (!selectedSong)
    return (
      <LyricPageContainer>
        <p>Loading song...</p>
      </LyricPageContainer>
    );

  return (
    <LyricPageContainer>
      <LyricPageHeader>
        <SongDetails>
          <h2>{selectedSong.title}</h2>
          <h3>{selectedSong.artist}</h3>
        </SongDetails>
        <LyricPageControls>
          {/* Random Button */}
          <RandomButton
            onClick={getRandomSong}
            title="Load Random Song"
            aria-label="Load a random song's lyrics"
          >
            <FaRandom />
          </RandomButton>

          {/* Column Toggle Button */}
          <ControlButton
            onClick={toggleColumns}
            title="Toggle Columns"
            aria-label="Toggle between single and double column layout"
          >
            {columnCount === 1 ? <FaColumns /> : <FaList />}
          </ControlButton>

          {/* Text Size Slider */}
          <TextSizeControl>
            <TextSizeLabel htmlFor="text-size-slider">Text Size</TextSizeLabel>
            <TextSizeSlider
              type="range"
              id="text-size-slider"
              min="12"
              max="24"
              value={textSize}
              onChange={handleTextSizeChange}
            />
          </TextSizeControl>
        </LyricPageControls>
      </LyricPageHeader>

      <LyricsContainer
        className={`columns-${columnCount}`}
        $textSize={textSize}
      >
        {renderLyrics(selectedSong.lyrics)}
      </LyricsContainer>

      <DateAdded>Added on: {selectedSong.date_lyrics_added}</DateAdded>
    </LyricPageContainer>
  );
};

export default LyricPage;
