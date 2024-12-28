// src/pages/LyricPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaColumns, FaList } from "react-icons/fa";
import {
  LyricPageContainer,
  LyricPageHeader,
  SongDetails,
  LyricPageControls,
  ControlButton,
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
      <Stanza key={index}>
        {stanza.map((line, idx) => (
          <StanzaParagraph key={idx}>{line}</StanzaParagraph>
        ))}
        {/* Add a horizontal line after each stanza except the last */}
        {index < stanzas.length - 1 && <StanzaSeparator />}
      </Stanza>
    ));
  };

  return (
    <LyricPageContainer>
      <LyricPageHeader>
        <SongDetails>
          <h2>{selectedSong.title}</h2>
          <h3>{selectedSong.artist}</h3>
        </SongDetails>
        <LyricPageControls>
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
