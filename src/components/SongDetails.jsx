import React from "react";

const SongDetails = ({ song }) => {
  if (!song) return <p>Select a song to view the lyrics.</p>;
  console.log("song lyric console log: ", typeof song.lyrics);
  return (
    <div className="song-details">
      <h2>
        {song.title} - {song.artist}
      </h2>
      <div className="song-lyrics">
        {typeof song.lyrics === "string"
          ? song.lyrics.split("\n").map((line, index) => (
              <p key={index}>
                {line.trim() === "" ? <br /> : line} {/* Handle empty lines */}
              </p>
            ))
          : song.lyrics.map((line, index) => (
              <p key={index}>
                {line.trim() === "" ? <br /> : line} {/* Handle empty lines */}
              </p>
            ))}
      </div>
    </div>
  );
};

export default SongDetails;
