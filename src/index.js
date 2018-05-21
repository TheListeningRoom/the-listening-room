import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import * as firebase from 'firebase'

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'symbalplayer.firebaseapp.com',
  databaseURL: 'https://symbalplayer.firebaseio.com',
  projectId: 'symbalplayer',
  storageBucket: 'symbalplayer.appspot.com',
  messagingSenderId: '511569276210',
}

firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
