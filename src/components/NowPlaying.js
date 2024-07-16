import React from 'react';
import './NowPlaying.css';

const NowPlaying = ({ song, isPlaying, togglePlayPause, nextSong, prevSong, setVolume }) => {
  return (
    <div className="now-playing">
      <h2>Now Playing: {song.title}</h2>
      <div className="controls">
        <button className="custom-button" onClick={prevSong}>Previous</button>
        <button className="custom-button" onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button className="custom-button" onClick={nextSong}>Next</button>
      </div>
      <div className="volume-control">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          onChange={(e) => setVolume(e.target.value)}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default NowPlaying;
