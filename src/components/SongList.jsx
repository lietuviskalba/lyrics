import React from 'react';

const SongList = ({ songs, onSelect }) => {
  return (
    <ul>
      {songs.map(song => (
        <li key={song.id} onClick={() => onSelect(song)}>
          <strong>{song.title}</strong> - {song.artist}
        </li>
      ))}
    </ul>
  );
};

export default SongList;