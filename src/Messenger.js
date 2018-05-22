import React, { Component } from 'react'
import './index.css'
import * as firebase from 'firebase'

export default class Messenger extends Component {
  constructor(props) {
    super(props)
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this)
  }

  componentDidMount() {
    const messages = firebase.database().ref('chat')
    messages.on('child_added', snap => {
      this.displayMessage(snap)
    })
  }

  displayMessage = snap => {
    const chatBoxDiv = document.getElementById('chatbox')
    const firstChild = chatBoxDiv.firstChild

    const newMessageDiv = document.createElement('div')
    newMessageDiv.className = 'single-message'

    const timestamp = snap.val().createdAt
    const timestampDiv = document.createElement('div')
    timestampDiv.className = 'message-item'
    timestampDiv.id = 'timestamp'
    timestampDiv.innerHTML = timestamp
    newMessageDiv.appendChild(timestampDiv)

    const userName = snap.val().userName
    const userNameDiv = document.createElement('div')
    userNameDiv.className = 'message-item'
    userNameDiv.id = 'user-name'
    userNameDiv.innerHTML = userName
    newMessageDiv.appendChild(userNameDiv)

    const userMessage = snap.val().userMessage
    const userMessageDiv = document.createElement('div')
    userMessageDiv.className = 'message-item'
    userMessageDiv.id = 'user-message'
    userMessageDiv.innerHTML = userMessage
    newMessageDiv.appendChild(userMessageDiv)

    chatBoxDiv.insertBefore(newMessageDiv, firstChild)
  }

  handleSubmitMessage(event) {
    event.preventDefault()
    if (event.target.text.value) {
      firebase
        .database()
        .ref('chat')
        .push({
          createdAt: new Date().toString().slice(0, 24),
          userName: event.target.name.value,
          userMessage: event.target.text.value,
        })
        .catch(error => console.error('Error writing to Firebase DB', error))
      event.target.text.value = ''
    }
  }

  render() {
    return (
      <div id="chatroom">
        <form className="input" onSubmit={this.handleSubmitMessage}>
          <div className="form-input-container">
            <div>
              <label for="user-name-form">Display Name</label>
            </div>
            <div>
              <input
                type="text"
                name="name"
                className="user-name-form"
                maxLength="20"
                placeholder="Noelle / Luis"
                required
              />
            </div>
          </div>

          <div className="form-input-container">
            <div>
              <label for="user-message-form">Penny for your thoughts</label>
            </div>
            <div>
              <input
                type="text"
                id="message"
                name="text"
                className="user-message-form"
                size="50"
                placeholder="Send a message"
              />
            </div>
          </div>

          <input type="submit" value="Send" />
        </form>

        <div className="historical-messages">
          <div id="chatbox" />
        </div>
      </div>
    )
  }
}
