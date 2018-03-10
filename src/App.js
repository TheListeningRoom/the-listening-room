import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      song: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this);
  }

  componentDidMount() {
    console.log('in componenet did mount')
    const messageRef = firebase.database().ref('message');
    messageRef.on('child_added', snap => {
      this.setState({
        song: snap.val().song
      });
    })
    firebase.database().ref('paused').on('value', snap => {
      this.paused = snap.val()
      this.setAudioState()
    })
  }

  setAudioState = () => {
    if (this.paused) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
  }

  audioDidMount = audio => {
    console.log('audioDidMount audio -->', audio)
    this.audio = audio;
    this.audio.addEventListener('loadeddata', this.setAudioState)
  }

  handlePlayPauseClick(event) {
    event.preventDefault();

    const pauseRef = firebase.database().ref('paused');
    pauseRef.set(!this.audio.paused)

    // let play = document.getElementById('audio');

    // if (document.getElementById('play')) {
    //   play.pause();
    //   document.getElementById('play').id = 'pause';
    //   playRef.set(false);
    // } else {
    //   document.getElementById('pause').id = 'play';
    //   play.play();
    //   playRef.set(true);
    // }
    // playRef.on('value', snap => {
    //   console.log(snap.val())
    //   if (snap.val) {
    //     play.pause()
    //   } else {
    //     play.play()
    //   }
    // })
  }

  handleSubmit(event) {
    event.preventDefault();
    const messageRef = firebase.database().ref('message');
    messageRef.push({
      song: event.target.song.value
    }).key
    event.target.song.value = '';
  }


  render() {

    const song = this.state.song;

    if (this.state.song) {
      return (
        <div className="App">

          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Symbal Player</h1>
          </header>

          <form onSubmit={this.handleSubmit}>
            <input type="text" name="song" placeholder="Enter song" />
          </form>

          <button id="play" onClick={this.handlePlayPauseClick}>
            ▶ ❚❚
          </button>

          <h1>{this.state.song}</h1>

          <audio src={song} ref={this.audioDidMount} loop>
            Your browser does not support the audio element.
          </audio>

        </div>
      );
    } else {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }
  }
}

export default App;
