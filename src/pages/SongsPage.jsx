// src/pages/SongsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import {
  SongsPageContainer,
  SongsPageTitle,
  SongList,
  SongItem,
  SongBox,
  SongImage,
  NoSongsMessage,
} from "./SongsPage.styled";

const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // State for loading

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
        navigate(`/lyrics/${song.id}`, {
          state: { selectedSong: { ...song, count: data.count } }, // Use data.count from the response
        });
      })
      .catch((err) => {
        console.error("Error incrementing count:", err);
        alert("Failed to select the song. Please try again.");
      });
  };

  return (
    <SongsPageContainer>
      <SongsPageTitle>All Songs</SongsPageTitle>
      <SearchBar
        placeholder="Search songs or artists..."
        onSearch={(query) => setSearchTerm(query)}
        initialValue={searchTerm}
        fullWidth={false}
      />
      {loading ? (
        <p>Loading songs...</p>
      ) : (
        <SongList>
          {songs.length === 0 ? (
            <NoSongsMessage>No songs available.</NoSongsMessage>
          ) : songs.filter((song) => {
              const lowerSearchTerm = searchTerm.toLowerCase();
              return (
                song.title.toLowerCase().includes(lowerSearchTerm) ||
                song.artist.toLowerCase().includes(lowerSearchTerm)
              );
            }).length === 0 ? (
            <NoSongsMessage>No songs found.</NoSongsMessage>
          ) : (
            songs
              .filter((song) => {
                const lowerSearchTerm = searchTerm.toLowerCase();
                return (
                  song.title.toLowerCase().includes(lowerSearchTerm) ||
                  song.artist.toLowerCase().includes(lowerSearchTerm)
                );
              })
              .map((song) => (
                <SongItem
                  key={song.id}
                  onClick={() => handleSongClick(song)}
                  tabIndex="0" // Makes the item focusable
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSongClick(song);
                    }
                  }}
                >
                  <SongBox>
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                  </SongBox>
                  {song.image && (
                    <SongImage>
                      <img
                        src={`http://localhost:5000${song.image}`} // Ensure the image path is correct
                        alt={`${song.title} cover`}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop if fallback fails
                          e.target.src = "/images/default.jpg"; // Path to your default image
                        }}
                      />
                    </SongImage>
                  )}
                </SongItem>
              ))
          )}
        </SongList>
      )}
    </SongsPageContainer>
  );
};

export default SongsPage;
