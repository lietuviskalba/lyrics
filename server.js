import fs from "fs";
import express from "express";
import cors from "cors"; // Import the CORS middleware

const app = express();

// Enable CORS
app.use(cors({ origin: "http://localhost:5173" }));

// Middleware to parse JSON request bodies
app.use(express.json());

app.post("/api/save-song", (req, res) => {
  const newSong = req.body;
  const filePath = "./src/data/songs.json";

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file.");
    }

    const songs = JSON.parse(data);
    songs.push(newSong);

    fs.writeFile(filePath, JSON.stringify(songs, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error writing file.");
      }
      res.status(200).send("Song saved successfully!");
    });
  });
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
