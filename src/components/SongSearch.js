import React, { useState } from 'react';
import './SongSearch.css';

const SongSearch = ({ songs, playSong }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="song-search">
      <input
        type="text"
        placeholder="Search for a song"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredSongs.length > 0 && (
        <ul>
          {filteredSongs.map((song, index) => (
            <li key={index} className="song-item" onClick={() => playSong(song)}>
              {song.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SongSearch;
