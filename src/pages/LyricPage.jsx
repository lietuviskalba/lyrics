// src/pages/LyricPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaColumns, FaList, FaRandom, FaPlay, FaStop } from "react-icons/fa";
import YouTube from "react-youtube";
import {
  LyricPageContainer,
  LyricPageHeader,
  SongDetails,
  LyricPageControls,
  ControlButton,
  RandomButton,
  TextSizeControl,
  TextSizeLabel,
  TextSizeSlider,
  LyricsContainer,
  Stanza,
  StanzaParagraph,
  StanzaSeparator,
  DateAdded,
  YouTubeContainer,
  PlayStopButton,
  LyricLine, // Newly added
  RomajiLine, // Newly added
  TranslationLine, // Newly added
} from "./LyricPage.styled";

const LyricPage = () => {
  const { id } = useParams(); // Extract the song ID from the URL
  const navigate = useNavigate();

  // **State Hooks**
  const [selectedSong, setSelectedSong] = useState(null);
  const [songs, setSongs] = useState([]);
  const [columnCount, setColumnCount] = useState(() => {
    const saved = localStorage.getItem("columnCount");
    return saved ? parseInt(saved, 10) : 1;
  });
  const [textSize, setTextSize] = useState(() => {
    const saved = localStorage.getItem("textSize");
    return saved ? parseInt(saved, 10) : 16;
  });
  const [isPlaying, setIsPlaying] = useState(false); // State to track video playback
  const [playerReady, setPlayerReady] = useState(false); // State to track player readiness
  const [playerError, setPlayerError] = useState(false); // State to track player errors

  // **Ref Hook**
  const playerRef = useRef(null);

  // **Effect Hooks**
  useEffect(() => {
    localStorage.setItem("columnCount", columnCount);
  }, [columnCount]);

  useEffect(() => {
    localStorage.setItem("textSize", textSize);
  }, [textSize]);

  useEffect(() => {
    // Fetch all songs to populate the songs list for random selection
    fetch("http://localhost:5000/api/songs")
      .then((res) => res.json())
      .then((songsData) => setSongs(songsData))
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  useEffect(() => {
    if (id) {
      // Fetch the specific song based on the ID from the URL
      fetch(`http://localhost:5000/api/songs/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Song not found");
          }
          return res.json();
        })
        .then((songData) => setSelectedSong(songData))
        .catch((err) => {
          console.error("Error fetching song:", err);
          setSelectedSong({ error: true });
        });
    }
  }, [id]);

  // **Utility Function**
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd}-${hh}:${min}`;
  };

  // **Event Handlers**
  const toggleColumns = () => {
    setColumnCount((prevCount) => (prevCount === 1 ? 2 : 1));
  };

  const handleTextSizeChange = (e) => {
    setTextSize(e.target.value);
  };

  const getRandomSong = () => {
    if (songs.length === 0) return;
    if (songs.length === 1) return; // Only one song available

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (songs[randomIndex].id === selectedSong.id);

    // Navigate to the random song's Lyric Page using useNavigate
    navigate(`/lyrics/${songs[randomIndex].id}`);
  };

  // **YouTube Video ID Extraction**
  const getYouTubeVideoId = (url) => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.slice(1);
      } else if (
        parsedUrl.hostname === "www.youtube.com" ||
        parsedUrl.hostname === "youtube.com"
      ) {
        return parsedUrl.searchParams.get("v");
      }
      return null;
    } catch (err) {
      console.error("Invalid YouTube URL:", err);
      return null;
    }
  };

  // **Playback Handlers**
  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      setIsPlaying(true);
    } else {
      console.warn("Player is not ready yet.");
    }
  };

  const handleStop = () => {
    if (playerRef.current) {
      playerRef.current.stopVideo();
      setIsPlaying(false);
    } else {
      console.warn("Player is not ready yet.");
    }
  };

  // **YouTube Player Options**
  const opts = {
    height: "150", // Minimal visible size to avoid ad blockers
    width: "300",
    playerVars: {
      autoplay: 1,
      controls: 0, // Hide controls if desired
      disablekb: 1, // Disable keyboard controls
      modestbranding: 1, // Minimal YouTube branding
      rel: 0, // Do not show related videos
    },
  };

  // **YouTube Player State Change Handler**
  const handlePlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  // **YouTube Player Error Handler**
  const handlePlayerError = (event) => {
    console.error("YouTube Player Error:", event.data);
    setPlayerError(true);
  };

  // **Lyrics Rendering Function**
  const renderLyrics = (lyrics) => {
    if (!lyrics || lyrics.length === 0) {
      return <p>No lyrics available.</p>;
    }

    const stanzas = [];
    let currentStanza = [];

    lyrics.forEach((line) => {
      if (line.trim() === "") {
        if (currentStanza.length > 0) {
          stanzas.push(currentStanza);
          currentStanza = [];
        }
      } else {
        currentStanza.push(line);
      }
    });

    if (currentStanza.length > 0) {
      stanzas.push(currentStanza);
    }

    return stanzas.map((stanza, index) => (
      <Stanza key={index}>
        {selectedSong.isForeign
          ? // Handle "Other language" songs with interleaved Romaji and Translation
            stanza.map((line, idx) => {
              if (idx % 3 === 0) {
                // Regular Lyric Line
                return <LyricLine key={idx}>{line}</LyricLine>;
              } else if (idx % 3 === 1) {
                // Romaji Line
                return <RomajiLine key={idx}>{line}</RomajiLine>;
              } else if (idx % 3 === 2) {
                // Translation Line
                return <TranslationLine key={idx}>{line}</TranslationLine>;
              } else {
                return null;
              }
            })
          : // Handle standard songs
            stanza.map((line, idx) => <LyricLine key={idx}>{line}</LyricLine>)}
        {index < stanzas.length - 1 && <StanzaSeparator />}
      </Stanza>
    ));
  };

  // **Conditional Rendering Messages**
  if (playerError) {
    return (
      <LyricPageContainer>
        <p>
          Unable to play the video. Please try disabling your ad blocker or
          check your network connection.
        </p>
      </LyricPageContainer>
    );
  }

  if (!selectedSong) {
    return (
      <LyricPageContainer>
        <p>Loading song...</p>
      </LyricPageContainer>
    );
  }

  if (selectedSong.error) {
    return (
      <LyricPageContainer>
        <p>Song not found.</p>
      </LyricPageContainer>
    );
  }

  const videoId = selectedSong.url ? getYouTubeVideoId(selectedSong.url) : null;

  return (
    <LyricPageContainer>
      <LyricPageHeader>
        <SongDetails>
          <h2>{selectedSong.title}</h2>
          <h3>{selectedSong.artist}</h3>
        </SongDetails>
        <LyricPageControls>
          {/* YouTube Player */}
          {videoId && (
            <YouTubeContainer>
              <YouTube
                videoId={videoId}
                opts={opts}
                host="https://www.youtube-nocookie.com"
                onReady={(event) => {
                  playerRef.current = event.target;
                  setPlayerReady(true);
                }}
                onStateChange={handlePlayerStateChange}
                onError={handlePlayerError}
              />
              <PlayStopButton
                onClick={isPlaying ? handleStop : handlePlay}
                aria-label={isPlaying ? "Stop video" : "Play video"}
                disabled={!playerReady}
              >
                {isPlaying ? <FaStop /> : <FaPlay />}
              </PlayStopButton>
            </YouTubeContainer>
          )}

          {/* Provide feedback if no video is available */}
          {!videoId && <p>No video available for this song.</p>}

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

      <DateAdded>
        Added on: {formatDate(selectedSong.date_lyrics_added)}
      </DateAdded>
    </LyricPageContainer>
  );
};

export default LyricPage;
