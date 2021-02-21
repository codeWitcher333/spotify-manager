import {Component} from 'react';
import './Track.css';

class Track extends Component {

    state = {

        text: '',
        playing: false
    };

    audio = new Audio(this.props.track.preview);

    addTrack(){

        this.props.onAdd(this.props.track);
    }
    removeTrack(){

        this.clearTimeouts();
        this.props.onRemove(this.props.track);
    }
    showLocalTracks(){

        this.props.onLocal(this.props.track.id,this.props.track.name);
    }
    updateTxtOrPlay(txt){

        if(this.props.listType === 'local')  this.setState({text: txt});
        else if(this.props.track.preview && !this.state.playing){

            window.setTimeout(() => {

                if(this.state.playing) this.audio.play();
            },1000);

            this.setState({playing: true});
        }

    }
    clearTimeouts(){

        let id = window.setTimeout(function() {}, 0);

        while (id--) {
            window.clearTimeout(id);
        }
    }
    stopMusic(){

        this.setState({playing: false});
        this.audio.pause();
    }
    render(){

        const track = this.props.track;
        const listType = this.props.listType;
        const isLocal = listType === 'local';

        return (

            <div className="Track" onMouseEnter={this.updateTxtOrPlay.bind(this,'edit')} onMouseLeave={this.stopMusic.bind(this)}>
                <div className="Track-information">
                    <h3>{track.name}</h3>
                    {isLocal || <p>{track.artist} | {track.album}</p>}
                </div>
                <button className="Track-action" onClick={isLocal?this.showLocalTracks.bind(this):listType === 'add'?this.addTrack.bind(this):this.removeTrack.bind(this)}>
                    {isLocal?this.state.text:(listType === 'add'?'+':'-')}
                </button>
            </div>
        )
    }
}

export default Track;