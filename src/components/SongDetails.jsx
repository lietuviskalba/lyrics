import React from "react";

const SongDetails = ({ song }) => {
  if (!song) return <p>Select a song to view the lyrics.</p>;

  return (
    <div className="song-details">
      <h2>{song.title}</h2>
      <h3>By {song.artist}</h3>
      <div className="lyrics">
        {song.lyrics.map((line, index) => (
          <p key={index} style={{ margin: line === "" ? "10px 0" : "0" }}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SongDetails;
