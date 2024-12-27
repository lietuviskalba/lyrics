import React, { useState, useEffect } from "react";
import "../styles/adminPage.css";

function AdminPage() {
  const [songs, setSongs] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch all songs
  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  // DELETE request
  const handleDeleteSong = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/songs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg);
      }
      // Filter out deleted song from the local state
      setSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
    } catch (err) {
      console.error("Error deleting song:", err);
      setError(err.message);
    }
  };

  const handleAddSong = async () => {
    // Split the textarea input by newline
    let lines = textInput.split("\n").map((line) => line.trimEnd());

    // 1. Remove all leading empty lines
    //    Find the first non-empty line, slice from there
    const firstNonEmptyIndex = lines.findIndex((line) => line.trim() !== "");
    if (firstNonEmptyIndex > 0) {
      lines = lines.slice(firstNonEmptyIndex);
    }

    // 2. Ensure we have at least 2 lines for Title + Artist
    if (lines.length < 2) {
      alert(
        "Please provide at least a title on the first line, and artist on the second line."
      );
      return;
    }

    // 3. Extract Title and Artist
    const title = lines[0].trim() || "Untitled";
    const artist = lines[1].trim() || "Unknown";
    const id = Date.now();

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

    // 4. Grab the rest of the lines as potential lyrics
    let rawLyrics = lines.slice(2);

    // 5. Remove trailing empty lines at the end (optional)
    while (
      rawLyrics.length > 0 &&
      rawLyrics[rawLyrics.length - 1].trim() === ""
    ) {
      rawLyrics.pop();
    }

    // 6. Collapse consecutive empty lines into a single one
    //    This ensures only one blank line between stanzas
    const lyrics = [];
    for (let i = 0; i < rawLyrics.length; i++) {
      const line = rawLyrics[i];
      if (line.trim() === "") {
        // If this is an empty line, check if the last line in `lyrics` is also empty
        if (lyrics.length === 0 || lyrics[lyrics.length - 1].trim() === "") {
          // Skip adding another blank line
          continue;
        }
        // Otherwise, add a blank line
        lyrics.push("");
      } else {
        lyrics.push(line);
      }
    }

    // 7. Build the song object
    const newSong = {
      id,
      title,
      artist,
      lyrics,
      date_lyrics_added: formatDate(id),
    };

    // 8. Make the POST request to your server
    try {
      const response = await fetch("http://localhost:5000/api/save-song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSong),
      });

      if (response.ok) {
        setSuccessMessage("Song added successfully!");
        setTextInput(""); // Clear input
        const updatedSongs = await fetch(
          "http://localhost:5000/api/songs"
        ).then((res) => res.json());
        setSongs(updatedSongs);
      } else {
        alert("Failed to add the song. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the song.");
    }
  };

  return (
    <div className="admin-page">
      {/* Top-left corner title */}
      <h1 className="admin-title">Admin Page</h1>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <div className="admin-container">
        {/* Left Section: Add Song */}
        <div className="admin-add-song">
          <h2>Add Song</h2>
          <textarea
            rows="10"
            cols="50"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="First line: Title, second line: Artist, remainder: Lyrics"
          />
          <br />
          <button onClick={handleAddSong}>Add Song</button>
        </div>

        {/* Right Section: List of Songs */}
        <div className="admin-song-list">
          <h2>
            List of Songs (<span>{songs.length}</span>)
          </h2>
          <ol>
            {songs.map((song, index) => (
              <li key={song.id}>
                <div className="song-info">
                  <button onClick={() => handleDeleteSong(song.id)}>
                    Delete
                  </button>
                  <span>
                    {song.title} - {song.artist}
                  </span>
                </div>
                <small>
                  Added on: {song.date_lyrics_added}; Count: {song.count}
                </small>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
