import React, { Component } from 'react'
import './App.css'
import * as firebase from 'firebase'
import Messenger from './Messenger'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      song: '',
      songName: '',
    }
    this.handleUpload = this.handleUpload.bind(this)
    this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this)
  }

  componentDidMount() {
    const messageRef = firebase.database().ref('message')

    messageRef.on('child_added', snap => {
      this.setState({
        song: snap.val().song,
        songName: snap.val().songName,
      })
    })
    firebase
      .database()
      .ref('paused')
      .on('value', snap => {
        this.paused = snap.val()
        this.setAudioState()
      })
  }

  setAudioState = () => {
    if (this.paused) {
      this.audio.pause()
    } else {
      this.audio.play()
    }
  }

  audioDidMount = audio => {
    this.audio = audio
    this.audio.addEventListener('loadeddata', this.setAudioState)
  }

  handlePlayPauseClick(event) {
    event.preventDefault()
    const pauseRef = firebase.database().ref('paused')
    pauseRef.set(!this.audio.paused)
  }

  handleUpload(evt) {
    let file = evt.target.files[0]
    let musicRef = firebase.storage().ref('music/' + file.name)
    musicRef.put(file).then(() => {
      const storageRef = firebase.storage().ref('/music')
      storageRef
        .child(file.name)
        .getMetadata()
        .then(metaData => {
          let url = metaData.downloadURLs[0]
          const messageRef = firebase.database().ref('message')
          messageRef.push({
            song: url,
            songName: file.name,
          })
        })
    })
  }

  render() {
    const song = this.state.song
    let songName
    if (this.state.songName) {
      songName = this.state.songName.slice(0, -4)
    }

    if (this.state.song) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">The Listening Room</h1>
          </header>

          <h2>Upload an MP3 below!</h2>

          <div className="file-upload">
            <input
              onChange={this.handleUpload}
              name="song"
              type="file"
              placeholder="Choose an mp3"
            />
          </div>

          <p>Now playing: {songName}</p>

          <button id="play" onClick={this.handlePlayPauseClick}>
            ▶ ❚❚
          </button>

          <audio src={song} ref={this.audioDidMount} loop />

          <Messenger />

        </div>
      )
    } else {
      return (
        <div>
          <h1 align="center">Loading...</h1>
        </div>
      )
    }
  }
}

export default App
