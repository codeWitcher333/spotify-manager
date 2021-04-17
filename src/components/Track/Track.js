import PropTypes from 'prop-types';
import { useState } from 'react';
import './Track.css';

const Track = (props) => {
  const { track, listType, onLocal, onAdd, onRemove } = props;
  const [playing, setPlaying] = useState(false);
  const [text, setText] = useState('');
  const [audio] = useState(track.preview ? new Audio(track.preview) : null);
  const isLocal = listType === 'local';

  const clearTimeouts = () => {
    let id = window.setTimeout(() => {}, 0);

    while (id) {
      id -= 1;
      window.clearTimeout(id);
    }
  };

  const addTrack = () => onAdd(track);

  const removeTrack = () => {
    clearTimeouts();
    onRemove(track);
  };

  const showLocalTracks = () => {
    onLocal(track.id, track.name);
  };
  const updateTxtOrPlay = () => {
    setText(isLocal ? 'edit' : listType === 'add' ? '+' : '-');
    if (track.preview && !playing) {
      window.setTimeout(() => {
        if (!playing) {
          setPlaying(true);
          audio.play();
        }
      }, 1000);
    }
  };

  const updateTxtAndStop = () => {
    setText('');
    if (track.preview) {
      clearTimeouts();
      audio.pause();
      setPlaying(false);
    }
  };
  const handleClick = () => {
    if (isLocal) showLocalTracks();
    else if (listType === 'add') addTrack();
    else {
      if (playing) updateTxtAndStop();
      removeTrack();
    }
  };
  return (

    <div className="Track" onMouseEnter={updateTxtOrPlay} onMouseLeave={updateTxtAndStop}>
      <div className="Track-information">
        <h3>{track.name}</h3>
        {isLocal || (
        <p>
          {track.artist}
          |
          {track.album}
        </p>
        )}
      </div>
      <button type="button" className="Track-action" onClick={handleClick}>
        {text}
      </button>
    </div>
  );
};

Track.propTypes = {
  listType: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
  onLocal: PropTypes.func,
  onRemove: PropTypes.func,
  track: PropTypes.shape({
    album: PropTypes.string,
    artist: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    preview: PropTypes.string,
  }).isRequired,
};
Track.defaultProps = {
  onAdd: () => {},
  onLocal: () => {},
  onRemove: () => {},
};

export default Track;
