// src/playlist.jsx
import React, { useState, useRef } from 'react';

function MusicPlayer() {
  // State to hold your playlist
  // The 'setPlaylist' function was removed as it was not being used.
  const [playlist] = useState([
    { id: 1, title: 'Song One', artist: 'Artist A', url: '/music/song1.mp3' },
    { id: 2, title: 'Song Two', artist: 'Artist B', url: '/music/song2.mp3' },
    { id: 3, title: 'Song Three', artist: 'Artist C', url: '/music/song3.mp3' },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  const currentSong = playlist[currentSongIndex];

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
    const newIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(newIndex);
  };

  const prevSong = () => {
    const newIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(newIndex);
  };

  // This effect will play a song whenever the currentSongIndex changes.
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.log("User needs to interact with the page first."));
    }
  }, [currentSongIndex]);


  return (
    <div className="music-player">
      <h2>Now Playing: {currentSong.title} by {currentSong.artist}</h2>

      <audio
        ref={audioRef}
        src={currentSong.url}
        onEnded={nextSong} // Auto-play next song when current one ends
        controls // It's good practice to add the default controls
      ></audio>

      <div className="controls">
        <button onClick={prevSong}>Previous</button>
        <button onClick={playSong}>Play</button>
        <button onClick={pauseSong}>Pause</button>
        <button onClick={nextSong}>Next</button>
      </div>

      <h3>Playlist</h3>
      <ul>
        {playlist.map((song, index) => (
          <li
            key={song.id}
            className={index === currentSongIndex ? 'active' : ''}
            // Update the index and play the song when a list item is clicked
            onClick={() => setCurrentSongIndex(index)}
          >
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MusicPlayer;