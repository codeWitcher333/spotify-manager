import {Component} from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {

    render(){

        const {onAdd,onRemove,onLocal} = this.props;

        return (

            <div className="TrackList">
                {this.props.tracks.map(track => <Track listType={this.props.listType} key={track.id} track={track} onAdd={onAdd} onRemove={onRemove} onLocal={onLocal} />)}
            </div>
        )
    }
}

export default TrackList;