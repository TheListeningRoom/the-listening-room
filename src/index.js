import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC4IEv77ynFo0v1Tc95dz8c_w0WbUWO8Ng",
  authDomain: "symbalplayer.firebaseapp.com",
  databaseURL: "https://symbalplayer.firebaseio.com",
  projectId: "symbalplayer",
  storageBucket: "symbalplayer.appspot.com",
  messagingSenderId: "511569276210"
};
firebase.initializeApp(config);

ReactDOM.render(
  <App />, document.getElementById('root')
);
registerServiceWorker();
