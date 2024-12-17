import React, { useState } from "react";
import SongList from "../components/SongList";
import SongDetails from "../components/SongDetails";
import songs from "../data/songs.json";

const SongPage = () => {
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <div>
      <h1>Lyric Website</h1>
      <SongList songs={songs} onSelect={setSelectedSong} />
      <SongDetails song={selectedSong} />
    </div>
  );
};

export default SongPage;
