import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import Messenger from './Messenger';
// import Cover from './Cover';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      song: ''
    }
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this)
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
    console.log('******** In setAudioState *********')
    console.log('this.paused -->', this.paused)
    console.log('this.audio -->', this.audio)
    if (this.paused) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
  }

  audioDidMount = audio => {
    console.log('******** In audioDidMount *********')
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

  // handleSubmit(event) {
  //   event.preventDefault();
  //   const messageRef = firebase.database().ref('message');
  //   messageRef.push({
  //     song: event.target.song.value
  //   }).key
  //   event.target.song.value = '';
  // }

  handleUpload(evt) {
    let file = evt.target.files[0]
    console.log(file.name)

    let musicRef = firebase.storage().ref('music/' + file.name)

    musicRef.put(file)
    .then(() => {
      console.log('i hit this part 1')
      const storageRef = firebase.storage().ref('/music')
      storageRef.child(file.name).getMetadata()
    .then(metaData => {
      console.log(metaData)
      let url = metaData.downloadURLs[0]
      console.log(url)
      const messageRef = firebase.database().ref('message');
      messageRef.push({
        song: url
      })
    })
  })
}


  render() {

    const song = this.state.song;

    if (this.state.song) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">The Listening Room</h1>
          </header>

          <div className="file-upload">
            <input onChange={this.handleUpload} name="song" type="file" />
          </div>

          <button id="play" onClick={this.handlePlayPauseClick}>
            ▶ ❚❚
          </button>

          <p>{this.state.song}</p>

          <audio src={song} ref={this.audioDidMount} loop />

          <Messenger />

        </div>
      );
    } else {
      return (
        <div>
          <h1 align="center">Loading...</h1>
        </div>
      )
    }
  }
}

export default App;

// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <h1 className="App-title">The Listening Room</h1>
// </header>
