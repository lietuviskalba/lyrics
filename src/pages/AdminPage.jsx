// src/pages/AdminPage.jsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/adminPage.css";

function AdminPage() {
  const [songs, setSongs] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  // Image-related states
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

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
      setSuccessMessage("Song deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting song:", err);
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  // Handle image selection from file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError("");
    } else if (file) {
      setError("Please select a valid image file.");
    }
  };

  // Handle paste events to capture images from clipboard
  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    let imageFound = false;
    for (let item of items) {
      if (item.type.startsWith("image/")) {
        const blob = item.getAsFile();
        setImageFile(blob);
        setImagePreview(URL.createObjectURL(blob));
        imageFound = true;
        // Prevent default paste behavior to avoid inserting image data elsewhere
        e.preventDefault();
        setError("");
        break;
      }
    }
    if (!imageFound) {
      setError("No image found in the pasted data.");
    }
  };

  // Handle form submission
  const handleAddSong = async () => {
    // Split the textarea input by newline
    let lines = textInput.split("\n").map((line) => line.trimEnd());

    // 1. Remove all leading empty lines
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
    const lyrics = [];
    for (let i = 0; i < rawLyrics.length; i++) {
      const line = rawLyrics[i];
      if (line.trim() === "") {
        if (lyrics.length === 0 || lyrics[lyrics.length - 1].trim() === "") {
          continue;
        }
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
      // image will be handled separately
    };

    // 8. Create FormData to include image
    const formData = new FormData();
    formData.append("id", newSong.id);
    formData.append("title", newSong.title);
    formData.append("artist", newSong.artist);
    formData.append("lyrics", newSong.lyrics.join("\n"));
    formData.append("date_lyrics_added", newSong.date_lyrics_added);
    formData.append("count", newSong.count || 0);

    if (imageFile) {
      formData.append("image", imageFile); // Field name must match multer's expectation
    }
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    console.log("Fetch URL:", "http://localhost:5000/api/save-song");

    // 9. Make the POST request to your server
    try {
      const response = await fetch("http://localhost:5000/api/save-song", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("Song added successfully!");
        setTextInput(""); // Clear input
        setImageFile(null); // Clear image
        setImagePreview(null); // Clear preview
        setError("");

        // Re-fetch the songs to update the list
        const updatedSongs = await fetch(
          "http://localhost:5000/api/songs"
        ).then((res) => res.json());
        setSongs(updatedSongs);

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        const errorText = await response.json();
        setError(errorText.message || "Failed to add the song.");
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while saving the song.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="admin-page" onPaste={handlePaste}>
      {/* Top-left corner title */}
      <h1 className="admin-title">Admin Page</h1>

      {error && <p className="error-message">Error: {error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

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

          {/* Image Upload Section */}
          <div className="image-upload-section">
            <label htmlFor="image-upload" className="image-upload-label">
              Upload Image (Optional):
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }} // Hide the default file input
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="upload-button"
            >
              Choose Image
            </button>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="image-preview">
              <p>Image Preview:</p>
              <img src={imagePreview} alt="Preview" width="200" />
            </div>
          )}

          {/* Paste Image Instructions */}
          <p className="paste-instruction">
            You can also paste an image by copying it to your clipboard and
            pressing
            <strong> Ctrl + V</strong> (Windows) or <strong>Cmd + V</strong>{" "}
            (Mac).
          </p>

          <button onClick={handleAddSong} className="add-song-button">
            Add Song
          </button>
        </div>

        {/* Right Section: List of Songs */}
        <div className="admin-song-list">
          <h2>
            List of Songs (<span>{songs.length}</span>)
          </h2>
          <ol>
            {songs.map((song) => (
              <li key={song.id} className="song-item">
                <div className="song-main">
                  <div className="song-info">
                    <button
                      onClick={() => handleDeleteSong(song.id)}
                      className="delete-button"
                      aria-label={`Delete ${song.title} by ${song.artist}`}
                    >
                      Delete
                    </button>
                    <span className="song-title-artist">
                      {song.title} - {song.artist}
                    </span>
                  </div>
                  {song.image && (
                    <div className="song-image">
                      <img
                        src={`http://localhost:5000${song.image}`}
                        alt={`${song.title} cover`}
                        width="80"
                        height="80"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
                <small className="song-extra-info">
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
