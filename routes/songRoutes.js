import { Router } from "express";
import fs from "fs";

const router = Router();
const filePath = "./src/data/songs.json";

router.get("/songs", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file.");
    }
    let songs = JSON.parse(data);
    songs.sort((a, b) => b.id - a.id);
    res.json(songs);
  });
});

router.post("/save-song", (req, res) => {
  const newSong = req.body;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file.");
    }

    const songs = JSON.parse(data);
    songs.push(newSong);

    // Sort by id descending (newest first)
    songs.sort((a, b) => b.id - a.id);

    fs.writeFile(filePath, JSON.stringify(songs, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error writing file.");
      }
      res.status(200).send("Song saved successfully!");
    });
  });
});
router.delete("/songs/:id", (req, res) => {
  const songId = parseInt(req.params.id, 10);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file.");
    }

    let songs = JSON.parse(data);

    // Filter out the song with the matching ID
    const updatedSongs = songs.filter((song) => song.id !== songId);

    // If no song was removed, return a 404 (optional)
    if (updatedSongs.length === songs.length) {
      return res.status(404).send("Song not found.");
    }

    // Write updated data back to JSON
    fs.writeFile(
      filePath,
      JSON.stringify(updatedSongs, null, 2),
      (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          return res.status(500).send("Error writing file.");
        }
        res.status(200).send("Song deleted successfully!");
      }
    );
  });
});

export default router;
