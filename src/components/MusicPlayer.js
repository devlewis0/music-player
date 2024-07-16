import React, { useState, useRef } from 'react';
import SongList from './SongList';
import NowPlaying from './NowPlaying';
import Visualizer from './Visualizer';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newSongs = [];

    files.forEach(file => {
      if (file.type.startsWith('audio/')) {
        newSongs.push({
          title: file.name,
          url: URL.createObjectURL(file),
        });
      }
    });

    setSongs([...songs, ...newSongs]);
  };

  const handleFolderUpload = async (e) => {
    try {
      const files = [];
      const dirHandle = await window.showDirectoryPicker();

      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file' && entry.name.endsWith('.mp3')) {
          const file = await entry.getFile();
          files.push({
            title: file.name,
            url: URL.createObjectURL(file),
          });
        }
      }

      setSongs([...songs, ...files]);
    } catch (error) {
      console.error('Folder upload error:', error);
    }
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.play();
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    const currentIndex = songs.findIndex((song) => song.url === currentSong.url);
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(songs[nextIndex]);
  };

  const prevSong = () => {
    const currentIndex = songs.findIndex((song) => song.url === currentSong.url);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(songs[prevIndex]);
  };

  const setVolume = (volume) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  const cleanPlaylist = () => {
    setSongs([]);
    setCurrentSong(null);
    setIsPlaying(false);
    audioRef.current.pause();
    audioRef.current.src = '';
  };

  return (
    <div className="music-player">
      <header className="header">
        <div className="upload-buttons">
          <label className="custom-file-upload">
            Choose File
            <input type="file" multiple accept="audio/*" onChange={handleFileUpload} />
          </label>
          <button onClick={handleFolderUpload}>Upload Folder</button>
          <button onClick={cleanPlaylist} className="clean-playlist">Clean Playlist</button>
        </div>
        <h1>BeatStream</h1>
      </header>
      <div className="main-content">
        {currentSong && (
          <>
            <NowPlaying
              song={currentSong}
              isPlaying={isPlaying}
              togglePlayPause={togglePlayPause}
              nextSong={nextSong}
              prevSong={prevSong}
              setVolume={setVolume}
            />
            <Visualizer audioRef={audioRef} />
          </>
        )}
        <SongList songs={songs} playSong={playSong} />
        <audio ref={audioRef} onEnded={nextSong} />
      </div>
      <footer className="footer">
        <p>&copy; 2024 BeatStream. All rights reserved.</p>
        <p>
          Created by Iran Trinidad. This is a free service. If you wish to contribute, you can do so via my <a href="https://www.buymeacoffee.com/yourlink">Buy Me a Coffee</a>. This service is ad-free.
        </p>
      </footer>
    </div>
  );
};

export default MusicPlayer;
