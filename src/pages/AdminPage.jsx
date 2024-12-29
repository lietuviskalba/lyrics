// src/pages/AdminPage.jsx
import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import {
  AdminPageContainer,
  AdminTitle,
  AdminContainer,
  AdminAddSong,
  AddSongTitle,
  TextArea,
  ImageUploadSection,
  ImageUploadLabel,
  UploadButton,
  ImagePreview,
  PasteInstruction,
  AddSongButton,
  AdminSongList,
  SongListTitleWrapper,
  SongListTitle,
  SongList,
  SongItem,
  SongMain,
  SongInfo,
  DeleteButton,
  UpdateButton,
  SongTitleArtist,
  SongImage,
  SongExtraInfo,
  SongURLStatus,
  NoSongsMessage,
  OtherLanguageSection,
  SuccessMessage, // Imported SuccessMessage
  ErrorMessage, // Imported ErrorMessage
} from "./AdminPage.styled";

function AdminPage() {
  const [songs, setSongs] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [editingSongId, setEditingSongId] = useState(null); // State for Editing

  // Search term state
  const [adminSearchTerm, setAdminSearchTerm] = useState("");

  // Image-related states
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // State for Other Language Checkbox
  const [isOtherLanguage, setIsOtherLanguage] = useState(false);

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

  // Fetch all songs
  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  // Define filteredSongs
  const filteredSongs = songs.filter((song) => {
    const lowerSearchTerm = adminSearchTerm.toLowerCase();
    return (
      song.title.toLowerCase().includes(lowerSearchTerm) ||
      song.artist.toLowerCase().includes(lowerSearchTerm)
    );
  });

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

  // Utility function to validate URLs
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handle form submission (Add or Update)
  const handleFormSubmit = async () => {
    if (editingSongId) {
      // Update existing song
      await handleUpdateSong();
    } else {
      // Add new song
      await handleAddSong();
    }
  };

  // Handle adding a new song
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

    // 4. Grab the rest of the lines as potential lyrics
    let rawLyrics = lines.slice(2);

    // 5. Remove trailing empty lines at the end (optional)
    while (
      rawLyrics.length > 0 &&
      rawLyrics[rawLyrics.length - 1].trim() === ""
    ) {
      rawLyrics.pop();
    }

    // 6. Check if the last line is a URL
    let url = null;
    if (rawLyrics.length > 0) {
      const lastLine = rawLyrics[rawLyrics.length - 1];
      const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
      if (urlRegex.test(lastLine)) {
        url = lastLine.trim();
        rawLyrics.pop(); // Remove the URL from lyrics
        if (!isValidURL(url)) {
          alert("The last line is not a valid URL. It will be ignored.");
          url = null;
        }
      }
    }

    // 7. Collapse consecutive empty lines into a single one
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

    // 8. If "Other language" is checked, validate lyrics structure
    if (isOtherLanguage) {
      // Ensure lyrics have groups of 3 lines (Lyric, Romaji, Translation)
      for (let i = 0; i < lyrics.length; i++) {
        if (lyrics[i].trim() === "") {
          // Skip stanza breaks
          continue;
        }
        // Check if the next two lines exist
        if (i + 2 >= lyrics.length) {
          alert(
            `Incomplete lyrics structure at line ${
              i + 1
            }. Each lyric line should be followed by Romaji and Translation lines.`
          );
          return;
        }
        // Optional: Further validation can be added here
        i += 2; // Skip the next two lines as they are Romaji and Translation
      }
    }

    // 9. Build the song object
    const newSong = {
      id,
      title,
      artist,
      lyrics,
      date_lyrics_added: formatDate(id), // Using the top-level formatDate
      isForeign: isOtherLanguage, // New flag as boolean
      count: 0, // Initialize count
      image: imageFile ? `/images/${imageFile.name}` : "/images/default.jpg", // Adjust as needed
    };

    if (url) {
      newSong.url = url;
      newSong.urlStatus = isValidURL(url) ? "functional" : "broken";
    } else {
      newSong.url = null;
      newSong.urlStatus = "no-url";
    }

    // 10. Create FormData to include image and URL
    const formData = new FormData();
    formData.append("id", newSong.id);
    formData.append("title", newSong.title);
    formData.append("artist", newSong.artist);
    formData.append("lyrics", newSong.lyrics.join("\n"));
    formData.append("date_lyrics_added", newSong.date_lyrics_added);
    formData.append("isForeign", newSong.isForeign); // Include the flag
    formData.append("count", newSong.count);

    if (imageFile) {
      formData.append("image", imageFile); // Field name must match multer's expectation
    }

    if (newSong.url) {
      formData.append("url", newSong.url);
    }

    // Debugging logs
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    console.log("Fetch URL:", "http://localhost:5000/api/save-song");

    // 11. Make the POST request to your server
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
        setIsOtherLanguage(false); // Reset Checkbox

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

  // Handle updating an existing song
  const handleUpdateSong = async () => {
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

    // 4. Grab the rest of the lines as potential lyrics
    let rawLyrics = lines.slice(2);

    // 5. Remove trailing empty lines at the end (optional)
    while (
      rawLyrics.length > 0 &&
      rawLyrics[rawLyrics.length - 1].trim() === ""
    ) {
      rawLyrics.pop();
    }

    // 6. Check if the last line is a URL
    let url = null;
    if (rawLyrics.length > 0) {
      const lastLine = rawLyrics[rawLyrics.length - 1];
      const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
      if (urlRegex.test(lastLine)) {
        url = lastLine.trim();
        rawLyrics.pop(); // Remove the URL from lyrics
        if (!isValidURL(url)) {
          alert("The last line is not a valid URL. It will be ignored.");
          url = null;
        }
      }
    }

    // 7. Collapse consecutive empty lines into a single one
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

    // 8. If "Other language" is checked, validate lyrics structure
    if (isOtherLanguage) {
      // Ensure lyrics have groups of 3 lines (Lyric, Romaji, Translation)
      for (let i = 0; i < lyrics.length; i++) {
        if (lyrics[i].trim() === "") {
          // Skip stanza breaks
          continue;
        }
        // Check if the next two lines exist
        if (i + 2 >= lyrics.length) {
          alert(
            `Incomplete lyrics structure at line ${
              i + 1
            }. Each lyric line should be followed by Romaji and Translation lines.`
          );
          return;
        }
        // Optional: Further validation can be added here
        i += 2; // Skip the next two lines as they are Romaji and Translation
      }
    }

    // 9. Prepare FormData for update
    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("lyrics", lyrics.join("\n"));
    formData.append("date_lyrics_added", formatDate(Date.now())); // Using the top-level formatDate
    formData.append("isForeign", isOtherLanguage); // Include the flag
    formData.append("count", 0); // You may adjust this as needed

    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (url) {
      formData.append("url", url);
      formData.append("urlStatus", isValidURL(url) ? "functional" : "broken"); // Ensure urlStatus is updated
    } else {
      formData.append("url", null);
      formData.append("urlStatus", "no-url");
    }

    // Debugging logs
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    console.log(
      "Fetch URL:",
      `http://localhost:5000/api/songs/${editingSongId}`
    );

    // Make the PUT request to update the song
    try {
      const response = await fetch(
        `http://localhost:5000/api/songs/${editingSongId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        setSuccessMessage("Song updated successfully!");
        setTextInput(""); // Clear input
        setImageFile(null); // Clear image
        setImagePreview(null); // Clear preview
        setError("");
        setEditingSongId(null); // Exit update mode
        setIsOtherLanguage(false); // Reset Checkbox

        // Re-fetch the songs to update the list
        const updatedSongs = await fetch(
          "http://localhost:5000/api/songs"
        ).then((res) => res.json());
        setSongs(updatedSongs);

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        const errorText = await response.json();
        setError(errorText.message || "Failed to update the song.");
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while updating the song.");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Handle clicking the Update button
  const handleUpdateButtonClick = (song) => {
    setEditingSongId(song.id);
    const lyricsWithUrl =
      song.url && song.urlStatus === "functional"
        ? [...song.lyrics, song.url]
        : song.lyrics;
    setTextInput([song.title, song.artist, ...lyricsWithUrl].join("\n"));
    setImageFile(null); // Clear current image preview
    setImagePreview(null);
    setError("");
    setSuccessMessage("");
    setIsOtherLanguage(song.isForeign || false); // Set checkbox based on song's isForeign flag
  };

  // Handle clicking on a song item (navigate to lyrics page or other desired action)
  const handleSongClick = (song) => {
    // Implement navigation to lyric page or other desired behavior
    // For example:
    window.location.href = `/lyrics/${song.id}`;
  };

  return (
    <AdminPageContainer onPaste={handlePaste}>
      {/* Top-left corner title */}
      <AdminTitle>Admin Page</AdminTitle>

      {/* Display Error and Success Messages */}
      {error && <ErrorMessage>Error: {error}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      <AdminContainer>
        {/* Left Section: Add/Update Song */}
        <AdminAddSong>
          <AddSongTitle>
            {editingSongId ? "Update Song" : "Add Song"}
          </AddSongTitle>
          {/* Checkbox for Other Language */}
          <OtherLanguageSection>
            <input
              type="checkbox"
              id="other-language-checkbox"
              checked={isOtherLanguage}
              onChange={(e) => setIsOtherLanguage(e.target.checked)}
            />
            <label htmlFor="other-language-checkbox">Other language</label>
          </OtherLanguageSection>
          <TextArea
            rows="10"
            cols="50"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={
              editingSongId
                ? "First line: Title, second line: Artist, remainder: Lyrics (optional last line: YouTube URL)"
                : "First line: Title, second line: Artist, remainder: Lyrics (optional last line: YouTube URL)"
            }
          />
          <br />

          {/* Image Upload Section */}
          <ImageUploadSection>
            <ImageUploadLabel htmlFor="image-upload">
              {editingSongId
                ? "Replace Image (Optional):"
                : "Upload Image (Optional):"}
            </ImageUploadLabel>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }} // Hide the default file input
            />
            <UploadButton onClick={() => fileInputRef.current.click()}>
              Choose Image
            </UploadButton>
          </ImageUploadSection>

          {/* Image Preview */}
          {imagePreview && (
            <ImagePreview>
              <p>Image Preview:</p>
              <img src={imagePreview} alt="Preview" />
            </ImagePreview>
          )}

          {/* Paste Image Instructions */}
          <PasteInstruction>
            You can also paste an image by copying it to your clipboard and
            pressing <strong> Ctrl + V</strong> (Windows) or{" "}
            <strong>Cmd + V</strong> (Mac).
          </PasteInstruction>

          <AddSongButton onClick={handleFormSubmit}>
            {editingSongId ? "Update Song" : "Add Song"}
          </AddSongButton>

          {/* If in update mode, show a cancel button */}
          {editingSongId && (
            <AddSongButton
              style={{
                backgroundColor: "#6c757d",
                marginTop: "10px",
              }}
              onClick={() => {
                setEditingSongId(null);
                setTextInput("");
                setImageFile(null);
                setImagePreview(null);
                setError("");
                setSuccessMessage("");
                setIsOtherLanguage(false); // Reset Checkbox
              }}
            >
              Cancel Update
            </AddSongButton>
          )}
        </AdminAddSong>

        {/* Right Section: List of Songs */}
        <AdminSongList>
          <SongListTitleWrapper>
            <SongListTitle>
              List of Songs (<span>{songs.length}</span>)
            </SongListTitle>
            <SearchBar
              placeholder="Search songs or artists..."
              onSearch={(query) => setAdminSearchTerm(query)}
              initialValue={adminSearchTerm}
              fullWidth={false}
            />
          </SongListTitleWrapper>
          <div aria-live="polite">
            {filteredSongs.length === 0 ? (
              <NoSongsMessage>
                {songs.length === 0 ? "No songs available." : "No songs found."}
              </NoSongsMessage>
            ) : (
              <SongList>
                {filteredSongs.map((song) => (
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
                    <SongMain>
                      <SongInfo>
                        <DeleteButton
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering SongItem's onClick
                            handleDeleteSong(song.id);
                          }}
                          aria-label={`Delete ${song.title} by ${song.artist}`}
                        >
                          Delete
                        </DeleteButton>
                        <UpdateButton
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering SongItem's onClick
                            handleUpdateButtonClick(song);
                          }}
                          aria-label={`Update ${song.title} by ${song.artist}`}
                        >
                          Update
                        </UpdateButton>
                        <SongTitleArtist>
                          {song.title} - {song.artist}
                        </SongTitleArtist>
                        {/* URL Status Display with Transient Prop */}
                        <SongURLStatus $status={song.urlStatus}>
                          {song.urlStatus === "functional" ? (
                            <a
                              href={song.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()} // Prevent triggering SongItem's onClick
                            >
                              Click link
                            </a>
                          ) : song.urlStatus === "broken" ? (
                            "URL is broken"
                          ) : (
                            "No URL"
                          )}
                        </SongURLStatus>
                      </SongInfo>
                      {song.image && (
                        <SongImage>
                          <img
                            src={`http://localhost:5000${song.image}`}
                            alt={`${song.title} cover`}
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null; // Prevent infinite loop if fallback fails
                              e.target.src = "/images/default.jpg"; // Path to your default image
                            }}
                          />
                        </SongImage>
                      )}
                    </SongMain>
                    <SongExtraInfo>
                      Added on: {song.date_lyrics_added}; Count: {song.count}
                    </SongExtraInfo>
                  </SongItem>
                ))}
              </SongList>
            )}
          </div>
        </AdminSongList>
      </AdminContainer>
    </AdminPageContainer>
  );
}

export default AdminPage;
