// src/routes/songRoutes.js
import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import multer from "multer";
import fetch from "node-fetch"; // Ensure node-fetch is installed
import Joi from "joi"; // Install Joi using `npm install joi`

const router = Router();
const filePath = path.join(process.cwd(), "src", "data", "songs.json");

// Configure storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const imagesPath = path.join(process.cwd(), "src", "public", "images");
    cb(null, imagesPath); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

// Filter to accept only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimeType && extname) {
    return cb(null, true);
  }
  cb(new Error("Only image files are allowed!"));
};

// Initialize multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

// Define Joi schema for song validation
const songSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required(),
  artist: Joi.string().required(),
  lyrics: Joi.array().items(Joi.string().allow("")).required(), // Allow empty strings for stanza breaks
  date_lyrics_added: Joi.string()
    .pattern(/^\d{4}\/\d{2}\/\d{2}-\d{2}:\d{2}$/)
    .required(), // Ensures format "YYYY/MM/DD-HH:MM"
  isForeign: Joi.boolean().required(),
  count: Joi.number().integer().min(0).required(),
  image: Joi.string().required(),
  url: Joi.string().uri().allow(null, ""),
  urlStatus: Joi.string().valid("functional", "broken", "no-url").required(),
});

// Utility functions
const readSongs = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    if (data.trim() === "") {
      return [];
    }
    const songs = JSON.parse(data);

    // Convert isForeign to boolean if it's a string
    const convertedSongs = songs.map((song) => ({
      ...song,
      isForeign:
        typeof song.isForeign === "string"
          ? song.isForeign.toLowerCase() === "true"
          : !!song.isForeign, // Ensure it's a boolean
    }));

    return convertedSongs;
  } catch (err) {
    if (err.code === "ENOENT") {
      // File doesn't exist, initialize as empty array
      return [];
    }
    throw err;
  }
};

const writeSongs = async (songs) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(songs, null, 2), "utf8");
  } catch (err) {
    throw err;
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

// Utility function to parse boolean from string
const parseBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return false;
};

// GET a song by ID
router.get("/songs/:id", async (req, res) => {
  try {
    const songId = parseInt(req.params.id, 10);
    if (isNaN(songId)) {
      return res.status(400).json({ message: "Invalid song ID." });
    }

    const songs = await readSongs();
    const song = songs.find((s) => s.id === songId);

    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ message: "Song not found." });
    }
  } catch (err) {
    console.error("Error in GET /songs/:id:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// GET all songs
router.get("/songs", async (req, res) => {
  try {
    const songs = await readSongs();
    // Sort by id descending
    songs.sort((a, b) => b.id - a.id);
    res.json(songs);
  } catch (err) {
    console.error("Error in GET /songs:", err);
    res.status(500).json({ message: "Error reading songs data" });
  }
});

// POST save-song with image upload
router.post("/save-song", upload.single("image"), async (req, res) => {
  try {
    const newSong = req.body;

    // Convert isForeign to boolean
    newSong.isForeign = parseBoolean(newSong.isForeign);

    // Validate required fields
    if (
      !newSong.id ||
      !newSong.title ||
      !newSong.artist ||
      !newSong.lyrics ||
      !newSong.date_lyrics_added ||
      newSong.isForeign === undefined
    ) {
      return res.status(400).json({ message: "Missing required song fields." });
    }

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

    // Allow empty strings for stanza breaks (already allowed in Joi schema)
    // No filtering here to preserve stanza breaks

    // Validate the new song using Joi
    const { error } = songSchema.validate(newSong);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
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

    // Convert isForeign to boolean
    updatedData.isForeign = parseBoolean(updatedData.isForeign);

    // Validate required fields
    if (
      !updatedData.title ||
      !updatedData.artist ||
      !updatedData.lyrics ||
      !updatedData.date_lyrics_added ||
      updatedData.isForeign === undefined
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

    // Allow empty strings for stanza breaks (already allowed in Joi schema)
    // No filtering here to preserve stanza breaks

    songToUpdate.date_lyrics_added = updatedData.date_lyrics_added;
    songToUpdate.count = parseInt(updatedData.count, 10) || songToUpdate.count;
    songToUpdate.isForeign = updatedData.isForeign; // Already converted to boolean

    // Validate the updated song using Joi
    const { error } = songSchema.validate(songToUpdate);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

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

// DELETE a song
router.delete("/songs/:id", async (req, res) => {
  const songId = parseInt(req.params.id, 10);
  try {
    const songs = await readSongs();
    const songIndex = songs.findIndex((song) => song.id === songId);

    if (songIndex === -1) {
      return res.status(404).send("Song not found.");
    }

    const [deletedSong] = songs.splice(songIndex, 1);

    // Delete the image if it's not the default image
    if (deletedSong.image && deletedSong.image !== "/images/default.jpg") {
      const imagePath = path.join(
        process.cwd(),
        "src",
        "public",
        deletedSong.image
      );
      try {
        await fs.unlink(imagePath);
        console.log(`Deleted image: ${imagePath}`);
      } catch (err) {
        console.error(`Error deleting image: ${err}`);
        // Proceed even if deleting fails
      }
    }

    await writeSongs(songs);
    res.status(200).send("Song deleted successfully!");
  } catch (err) {
    console.error(`Error in DELETE /songs/${songId}:`, err);
    res.status(500).send("Error deleting song.");
  }
});

// POST increment count for a song
router.post("/songs/:id/increment", async (req, res) => {
  const songId = parseInt(req.params.id, 10);
  try {
    const songs = await readSongs();
    const songIndex = songs.findIndex((s) => s.id === songId);
    if (songIndex !== -1) {
      // Ensure the 'count' property exists and is a number
      if (typeof songs[songIndex].count === "number") {
        songs[songIndex].count += 1;
      } else {
        songs[songIndex].count = 1; // Initialize if undefined or not a number
      }
      await writeSongs(songs);
      res.json({ message: "Count incremented", count: songs[songIndex].count });
    } else {
      res.status(404).json({ message: "Song not found" });
    }
  } catch (err) {
    console.error("Error in POST /songs/:id/increment:", err);
    res.status(500).json({ message: "Error updating song count" });
  }
});

export default router;
