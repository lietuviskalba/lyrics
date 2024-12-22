import React from "react";

const SongList = ({ songs, onSelect }) => {
  return (
    <ul className="song-list">
      {songs.map((song, index) => (
        <li key={index} onClick={() => onSelect(song)}>
          {song.title} - {song.artist}
        </li>
      ))}
    </ul>
  );
};

export default SongList;
