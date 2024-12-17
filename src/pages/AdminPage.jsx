import React, { useState } from "react";

const AdminPage = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [lyrics, setLyrics] = useState("");

  const handleAddSong = async () => {
    const newSong = {
      id: Date.now(),
      title,
      artist,
      lyrics: lyrics.split("\n"), // Convert formatted text to an array of lines
    };

    // Save to JSON file (simulated for now)
    try {
      const response = await fetch("http://localhost:5000/api/save-song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSong),
      });

      if (response.ok) {
        alert("Song added successfully!");
        setTitle("");
        setArtist("");
        setLyrics("");
      } else {
        alert("Failed to add song.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the song.");
    }
  };

  return (
    <div className="admin-page">
      <h2>Add New Song</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Song Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Artist:
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </label>
        <label>
          Lyrics:
          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            rows="10"
          />
        </label>
        <button type="button" onClick={handleAddSong}>
          Add Song
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
