import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../PlayList/PlayList';
import PlaylistList from '../PlaylistList/PlaylistList';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistList, setPlaylistList] = useState([]);
  const [status, setStatus] = useState('');
  const [playlistId, setPlaylistId] = useState('');

  const trackAlreadyAdded = (newTrack) => playlistTracks.some((addedTrack) => addedTrack.id === newTrack.id);
  const addTrack = (newTrack) => trackAlreadyAdded(newTrack) || setPlaylistTracks(playlistTracks.concat(newTrack));
  const removeTrack = (newTrack) => setPlaylistTracks(playlistTracks.filter((track) => track.id !== newTrack.id));
  const refreshLocalPlaylists = () => Spotify.getPlaylists().then((playlists) => setPlaylistList(playlists));
  const searchTracks = (searchTerm) => Spotify.searchTracks(searchTerm).then((tracks) => setSearchResults(tracks.filter((track) => !trackAlreadyAdded(track))));

  const addPlaylistTracks = (listId, listName) => {
    Spotify.getTracks(listId).then((tracks) => setPlaylistTracks(tracks))
      .then(() => setPlaylistName(listName))
      .then(() => setPlaylistId(listId));
  };
  const clearState = (newStatus) => {
    setStatus(newStatus);
    setPlaylistName('New Playlist');
    setPlaylistTracks([]);
    setPlaylistId('');

    window.setTimeout(() => setStatus(''), 5000);
  };
  const savePlaylist = () => Spotify.savePlaylist(playlistName, playlistId, playlistTracks.map((track) => track.uri))
    .then((newStatus) => clearState(newStatus))
    .then(window.setTimeout(refreshLocalPlaylists, 100));

  useEffect(refreshLocalPlaylists, []);

  return (

    <div>
      <h1>{'Spotify Manager'.split('').map((l, i) => <span key={l + i} className={i % 2 && 'highlight'}>{l}</span>)}</h1>
      <div className="App">
        <SearchBar onSearch={searchTracks} />
        <div className="App-info">{status}</div>
        <div className="App-playlist">
          <PlaylistList playlistList={playlistList} onLocal={addPlaylistTracks} />
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <PlayList playlistName={playlistName} tracks={playlistTracks} onRemove={removeTrack} onNameChange={setPlaylistName} onSave={savePlaylist} />
        </div>
      </div>
    </div>
  );
};

export default App;
