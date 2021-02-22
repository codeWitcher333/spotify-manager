import { Component } from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends Component {
  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (

      <div className="Playlist">
        <input value={this.props.playlistName} onChange={this.handleNameChange.bind(this)} />
        <TrackList tracks={this.props.tracks} onRemove={this.props.onRemove} listType="remove" />
        <button onClick={this.props.onSave} className="Playlist-save">SAVE PLAYLIST</button>
      </div>
    );
  }
}

export default PlayList;
