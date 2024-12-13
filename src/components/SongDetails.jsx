import React from 'react';

const SongDetails = ({ song }) => {
  if (!song) return <p>Select a song to view the lyrics.</p>;

  return (
    <div>
      <h2>{song.title}</h2>
      <h3>By {song.artist}</h3>
      <p>{song.lyrics}</p>
    </div>
  );
};

export default SongDetails;
