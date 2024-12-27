// songRoutes.js
import { Router } from "express";
import fs from "fs/promises"; // Use fs.promises for async operations
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const filePath = path.join(__dirname, "../data/songs.json"); // Adjust the path as needed

console.log("Resolved songs.json path:", filePath); // Log the file path

// Utility functions
const readSongs = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    console.log("Successfully read songs.json");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading songs.json:", err);
    throw err;
  }
};

const writeSongs = async (songs) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(songs, null, 2), "utf8");
    console.log("Successfully wrote to songs.json");
  } catch (err) {
    console.error("Error writing to songs.json:", err);
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

// GET a single song by ID
router.get("/songs/:id", async (req, res) => {
  try {
    const songs = await readSongs();
    const songId = parseInt(req.params.id, 10);
    const song = songs.find((s) => s.id === songId);
    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ message: "Song not found" });
    }
  } catch (err) {
    console.error("Error in GET /songs/:id:", err);
    res.status(500).json({ message: "Error reading songs data" });
  }
});

// POST save-song
router.post("/save-song", async (req, res) => {
  const newSong = req.body;
  console.log("Received new song:", newSong);

  try {
    const songs = await readSongs();
    songs.push(newSong);
    // Sort by id descending
    songs.sort((a, b) => b.id - a.id);
    await writeSongs(songs);
    res.status(200).send("Song saved successfully!");
  } catch (err) {
    console.error("Error in POST /save-song:", err);
    res.status(500).send("Error saving song.");
  }
});

// DELETE a song
router.delete("/songs/:id", async (req, res) => {
  const songId = parseInt(req.params.id, 10);
  console.log(`Received request to delete song with ID: ${songId}`);

  try {
    const songs = await readSongs();
    const updatedSongs = songs.filter((song) => song.id !== songId);

    if (updatedSongs.length === songs.length) {
      console.log("Song not found for deletion.");
      return res.status(404).send("Song not found.");
    }

    await writeSongs(updatedSongs);
    res.status(200).send("Song deleted successfully!");
  } catch (err) {
    console.error("Error in DELETE /songs/:id:", err);
    res.status(500).send("Error deleting song.");
  }
});

// POST increment count for a song
router.post("/songs/:id/increment", async (req, res) => {
  const songId = parseInt(req.params.id, 10);
  console.log(`Received request to increment count for song ID: ${songId}`);

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
      console.log(
        `Count incremented for song ID: ${songId}, new count: ${songs[songIndex].count}`
      );
      res.json({ message: "Count incremented", count: songs[songIndex].count });
    } else {
      console.log("Song not found for increment.");
      res.status(404).json({ message: "Song not found" });
    }
  } catch (err) {
    console.error("Error in POST /songs/:id/increment:", err);
    res.status(500).json({ message: "Error updating song count" });
  }
});

export default router;
