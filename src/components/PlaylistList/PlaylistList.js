import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './PlaylistList.css';
import TrackList from '../TrackList/TrackList';

class PlaylistList extends PureComponent {
  render() {
    const { playlistList, onLocal } = this.props;
    return (
      <div className="PlaylistList">
        <h2>Local Playlists</h2>
        <TrackList tracks={playlistList} listType="local" onLocal={onLocal} />
      </div>
    );
  }
}

PlaylistList.propTypes = {
  onLocal: PropTypes.func.isRequired,
  playlistList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlaylistList;
