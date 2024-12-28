// songRoutes.js
import { Router } from "express";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import multer from "multer";

const router = Router();
const filePath = path.join(process.cwd(), "src", "data", "songs.json");
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const imagesPath = path.join(__dirname, "../../public/images");
    console.log("Saving image to:", imagesPath); // Debugging log
    cb(null, path.join(process.cwd(), "src", "public", "images")); // Ensure this directory exists
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

// Utility functions
const readSongs = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    if (data.trim() === "") {
      return [];
    }
    return JSON.parse(data);
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
    console.log("POST /save-song request received");
    console.log("Form Fields:", req.body);
    if (req.file) {
      console.log("Uploaded Image:", req.file.filename);
    } else {
      console.log("No image uploaded. Using default image.");
    }
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

    // Handle image
    if (req.file) {
      newSong.image = `/images/${req.file.filename}`;
    } else {
      newSong.image = "/images/default.jpg"; // Ensure default.jpg exists in public/images
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

// DELETE a song
router.delete("/songs/:id", async (req, res) => {
  const songId = parseInt(req.params.id, 10);
  try {
    const songs = await readSongs();
    const updatedSongs = songs.filter((song) => song.id !== songId);

    if (updatedSongs.length === songs.length) {
      return res.status(404).send("Song not found.");
    }

    await writeSongs(updatedSongs);
    res.status(200).send("Song deleted successfully!");
  } catch (err) {
    console.error(`Error in DELETE /songs/${songId}:`, err);
    res.status(500).send("Error deleting song.");
  }
});

export default router;
