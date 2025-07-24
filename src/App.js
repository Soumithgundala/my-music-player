// src/App.js
import React from 'react';
import './App.css';
import Playlist from './playlist'; // Assuming your component is named Playlist

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Music Player</h1>
        <Playlist /> {/* Use your component here */}
      </header>
    </div>
  );
}

export default App; 