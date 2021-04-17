import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends PureComponent {
  render() {
    const { onAdd, onRemove, onLocal, tracks, listType } = this.props;

    return (

      <div className="TrackList">
        {tracks.map((track) => <Track listType={listType} key={track.id} track={track} onAdd={onAdd} onRemove={onRemove} onLocal={onLocal} />)}
      </div>
    );
  }
}

TrackList.propTypes = {
  listType: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
  onLocal: PropTypes.func,
  onRemove: PropTypes.func,
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TrackList.defaultProps = {
  onAdd: () => {},
  onLocal: () => {},
  onRemove: () => {},
};

export default TrackList;
