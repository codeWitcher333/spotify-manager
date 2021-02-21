import {Component} from 'react';
import './PlaylistList.css';
import TrackList from '../TrackList/TrackList';

class PlaylistList extends Component {

    render(){

        return (

            <div className="PlaylistList">
                <h2>Local Playlists</h2>
                <TrackList tracks={this.props.playlistList} listType='local' onLocal={this.props.onLocal} />
            </div>
        )
    }
}

export default PlaylistList;