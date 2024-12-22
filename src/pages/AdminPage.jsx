import React, { useState, useEffect } from "react";

function AdminPage() {
  const [songs, setSongs] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch all songs (similar to how you load them in SongPage)
  useEffect(() => {
    // If you’re storing songs in the same JSON file, you can fetch them from an endpoint
    // Or simply import them like import songsData from '../data/songs.json';
    fetch("http://localhost:5000/api/songs") // This route must exist if you want to fetch all songs
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
    // Split the text input into lines
    const lines = textInput.split("\n");
    if (lines.length < 3) {
      alert("Please provide at least three lines: Title, Artist, and Lyrics.");
      return;
    }

    // Extract title, artist, and lyrics
    const title = lines[0].trim(); // First line
    const artist = lines[1].trim(); // Second line
    const lyrics = lines.slice(2); // Remaining lines as an array

    // Create the new song object
    const newSong = { id: Date.now(), title, artist, lyrics };

    try {
      const response = await fetch("http://localhost:5000/api/save-song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSong),
      });

      if (response.ok) {
        setSuccessMessage("Song added successfully!");
        setTextInput(""); // Clear input after success
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
      <h1>Admin Page</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <h3>Song List</h3>
      <ul>
        {songs.map((song) => (
          <li key={song.id} style={{ marginBottom: "10px" }}>
            <strong>{song.title}</strong> - {song.artist}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => handleDeleteSong(song.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <textarea
        rows="10"
        cols="50"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="First line: Title, Second line: Artist, Remaining lines: Lyrics"
      ></textarea>
      <br />
      <button onClick={handleAddSong}>Add Song</button>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}

export default AdminPage;
