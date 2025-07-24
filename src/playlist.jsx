// src/playlist.jsx
import React, { useState, useRef, useEffect } from 'react';

function MusicPlayer() {
  // --- CHANGE 1: Re-enabled setPlaylist to allow modifications ---
  const [playlist, setPlaylist] = useState([
    { id: 1, title: 'Song One', artist: 'Artist A', url: '/music/song1.mp3' },
    { id: 2, title: 'Song Two', artist: 'Artist B', url: '/music/song2.mp3' },
    { id: 3, title: 'Song Three', artist: 'Artist C', url: '/music/song3.mp3' },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);
  
  // Use a variable for the current song to handle an empty playlist
  const currentSong = playlist[currentSongIndex];

  // --- CHANGE 2: Function to add a new song ---
  const addSong = () => {
    const newSong = {
      id: playlist.length + 1, // Simple ID generation
      title: `New Song ${playlist.length - 2}`,
      artist: 'New Artist',
      url: '/music/song4.mp3', // Using a placeholder URL
    };
    setPlaylist(prevPlaylist => [...prevPlaylist, newSong]);
  };

  // --- CHANGE 3: Function to remove a song by its ID ---
  const removeSong = (songId, event) => {
    event.stopPropagation(); // Prevents the song from playing when remove is clicked
    setPlaylist(prevPlaylist => prevPlaylist.filter(song => song.id !== songId));
    // Note: If you remove the currently playing song, you may want to add logic
    // here to jump to the next song or stop playback.
  };

  const playSong = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const nextSong = () => {
    if (playlist.length === 0) return;
    const newIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(newIndex);
  };

  const prevSong = () => {
    if (playlist.length === 0) return;
    const newIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(newIndex);
  };

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.play().catch(error => console.log("Playback requires user interaction."));
    }
  }, [currentSongIndex, currentSong]);


  return (
    <div className="music-player">
      {/* Only show player info if a song exists */}
      {currentSong ? (
        <>
          <h2>Now Playing: {currentSong.title} by {currentSong.artist}</h2>
          <audio
            ref={audioRef}
            src={currentSong.url}
            onEnded={nextSong}
            controls
          ></audio>
        </>
      ) : (
        <h2>Playlist is empty</h2>
      )}

      <div className="controls">
        <button onClick={prevSong}>Previous</button>
        <button onClick={playSong}>Play</button>
        <button onClick={pauseSong}>Pause</button>
        <button onClick={nextSong}>Next</button>
        {/* --- CHANGE 4: Button to add a new song --- */}
        <button onClick={addSong}>Add Demo Song</button>
      </div>

      <h3>Playlist</h3>
      <ul>
        {playlist.map((song, index) => (
          <li
            key={song.id}
            className={index === currentSongIndex ? 'active' : ''}
            onClick={() => setCurrentSongIndex(index)}
          >
            {song.title} - {song.artist}
            {/* --- CHANGE 5: Button to remove a specific song --- */}
            <button className="remove-btn" onClick={(e) => removeSong(song.id, e)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MusicPlayer;