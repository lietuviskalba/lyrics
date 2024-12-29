// src/routes/songRoutes.js
// ... existing imports and setup

// POST save-song with image upload
router.post("/save-song", upload.single("image"), async (req, res) => {
  try {
    const newSong = req.body;

    // Validate required fields
    if (
      !newSong.id ||
      !newSong.title ||
      !newSong.artist ||
      !newSong.lyrics ||
      !newSong.date_lyrics_added
    ) {
      return res.status(400).json({ message: "Missing required song fields." });
    }

    // Convert isForeign from string to boolean
    newSong.isForeign = newSong.isForeign === "true";

    // Handle image
    if (req.file) {
      newSong.image = `/images/${req.file.filename}`;
    } else {
      newSong.image = "/images/default.jpg"; // Ensure default.jpg exists in public/images
    }

    // Handle URL
    if (newSong.url && isValidURL(newSong.url)) {
      // Use YouTube oEmbed to check if video exists
      try {
        const oEmbedURL = `https://www.youtube.com/oembed?url=${encodeURIComponent(
          newSong.url
        )}&format=json`;
        const response = await fetch(oEmbedURL, { method: "GET" });
        if (response.ok) {
          newSong.urlStatus = "functional";
        } else {
          newSong.urlStatus = "broken";
        }
      } catch (err) {
        console.error("Error checking YouTube URL:", err);
        newSong.urlStatus = "broken";
      }
    } else {
      newSong.url = null; // Set to null if no URL or invalid URL
      newSong.urlStatus = "no-url";
    }

    // Parse count to integer
    newSong.count = parseInt(newSong.count, 10) || 0;

    // Parse id to integer
    newSong.id = parseInt(newSong.id, 10);

    // Ensure lyrics is an array
    if (typeof newSong.lyrics === "string") {
      newSong.lyrics = newSong.lyrics.split("\n").map((line) => line.trim());
    }

    const songs = await readSongs();
    songs.push(newSong);
    // Sort songs by id descending
    songs.sort((a, b) => b.id - a.id);
    await writeSongs(songs);

    res.status(200).json({ message: "Song saved successfully!" });
  } catch (err) {
    if (err instanceof multer.MulterError) {
      // Handle Multer-specific errors
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "Image size should not exceed 5MB." });
      }
      return res.status(400).json({ message: err.message });
    } else {
      console.error("Error in POST /save-song:", err);
      res.status(500).json({ message: "Error saving song." });
    }
  }
});

// PUT update-song with image upload
router.put("/songs/:id", upload.single("image"), async (req, res) => {
  try {
    const songId = parseInt(req.params.id, 10);
    const updatedData = req.body;

    // Validate required fields
    if (
      !updatedData.title ||
      !updatedData.artist ||
      !updatedData.lyrics ||
      !updatedData.date_lyrics_added
    ) {
      return res.status(400).json({ message: "Missing required song fields." });
    }

    const songs = await readSongs();
    const songIndex = songs.findIndex((song) => song.id === songId);

    if (songIndex === -1) {
      return res.status(404).json({ message: "Song not found." });
    }

    const songToUpdate = songs[songIndex];

    // Handle image replacement
    if (req.file) {
      // Delete the old image if it's not the default image
      if (songToUpdate.image && songToUpdate.image !== "/images/default.jpg") {
        const oldImagePath = path.join(
          process.cwd(),
          "src",
          "public",
          songToUpdate.image
        );
        try {
          await fs.unlink(oldImagePath);
          console.log(`Deleted old image: ${oldImagePath}`);
        } catch (err) {
          console.error(`Error deleting old image: ${err}`);
          // Proceed even if deleting fails
        }
      }
      // Assign the new image path
      songToUpdate.image = `/images/${req.file.filename}`;
    }
    // If no new image is uploaded, keep the existing image

    // Handle URL
    if (updatedData.url && isValidURL(updatedData.url)) {
      // Use YouTube oEmbed to check if video exists
      try {
        const oEmbedURL = `https://www.youtube.com/oembed?url=${encodeURIComponent(
          updatedData.url
        )}&format=json`;
        const response = await fetch(oEmbedURL, { method: "GET" });
        if (response.ok) {
          songToUpdate.urlStatus = "functional";
        } else {
          songToUpdate.urlStatus = "broken";
        }
      } catch (err) {
        console.error("Error checking YouTube URL:", err);
        songToUpdate.urlStatus = "broken";
      }
      songToUpdate.url = updatedData.url.trim();
    } else {
      // If no URL is provided or invalid, remove the URL
      songToUpdate.url = null;
      songToUpdate.urlStatus = "no-url";
    }

    // Update other fields
    songToUpdate.title = updatedData.title;
    songToUpdate.artist = updatedData.artist;
    songToUpdate.lyrics =
      typeof updatedData.lyrics === "string"
        ? updatedData.lyrics.split("\n").map((line) => line.trim())
        : updatedData.lyrics;
    songToUpdate.date_lyrics_added = updatedData.date_lyrics_added;
    songToUpdate.count = parseInt(updatedData.count, 10) || songToUpdate.count;

    // Convert isForeign from string to boolean
    songToUpdate.isForeign = updatedData.isForeign === "true";

    // Save the updated songs list
    await writeSongs(songs);

    res.status(200).json({ message: "Song updated successfully!" });
  } catch (err) {
    if (err instanceof multer.MulterError) {
      // Handle Multer-specific errors
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "Image size should not exceed 5MB." });
      }
      return res.status(400).json({ message: err.message });
    } else {
      console.error("Error in PUT /songs/:id:", err);
      res.status(500).json({ message: "Error updating song." });
    }
  }
});
