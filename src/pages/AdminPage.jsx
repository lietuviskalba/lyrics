import React, { useState } from "react";

function AdminPage() {
  const [textInput, setTextInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    const newSong = { title, artist, lyrics };

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
    <div>
      <h1>Admin Page</h1>
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
