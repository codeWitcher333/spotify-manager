import { Component } from 'react';
import PropTypes from 'prop-types';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends Component {
  handleNameChange(e) {
    const { onNameChange } = this.props;
    onNameChange(e.target.value);
  }

  render() {
    const { playlistName, tracks, onRemove, onSave } = this.props;

    return (

      <div className="Playlist">
        <input value={playlistName} onChange={this.handleNameChange.bind(this)} />
        <TrackList tracks={tracks} onRemove={onRemove} listType="remove" />
        <button type="button" onClick={onSave} className="Playlist-save">SAVE PLAYLIST</button>
      </div>
    );
  }
}

PlayList.propTypes = {
  onNameChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  playlistName: PropTypes.string,
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
PlayList.defaultProps = {
  playlistName: '',
};
export default PlayList;
