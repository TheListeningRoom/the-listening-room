import React, {Component} from 'react';
import './index.css';

class Cover extends Component {
    constructor (props) {
        super(props);

        this.state = {
            videoURL: 'https://firebasestorage.googleapis.com/v0/b/symbalplayer.appspot.com/o/02%20Love%20Me.m4p?alt=media&token=4d4ab3bd-7663-4501-8001-a91ec58d6590'
        }
    }

    render () {
        return (
            <video id="background-video" loop autoPlay>
                <source src={this.state.videoURL} type="video/mp4" />
                <source src={this.state.videoURL} type="video/ogg" />
                Your browser does not support the video tag.
            </video>
        )
    }
};

export default Cover;
