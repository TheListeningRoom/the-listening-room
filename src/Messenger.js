import React, { Component } from 'react';
// import logo from './logo.svg';
import './index.css';
import * as firebase from 'firebase';

export default class Messenger extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
    }

    componentDidMount() {
        const messages = firebase.database().ref('chat')
        messages.on('child_added', snap => {
            this.displayMessage(snap);
            // const message = `${snap.val().createdAt}\u00A0\u00A0\u00A0\u00A0 ${snap.val().text}`;
            // const chatText = document.createElement('div');
            // chatText.className = 'single-message'
            // // const chatBoxDiv = document.getElementById('chatbox');
            // const firstChild = chatBoxDiv.firstChild;
            // chatBoxDiv.insertBefore(chatText, firstChild).innerHTML = message
        })
    }

    displayMessage = snap => {
        const chatBoxDiv = document.getElementById('chatbox');
        const firstChild = chatBoxDiv.firstChild;

        const newMessageDiv = document.createElement('div');
        newMessageDiv.className = 'single-message';

        const timestamp = snap.val().createdAt;
        const timestampDiv = document.createElement('div');
        timestampDiv.className = 'timestamp';
        timestampDiv.innerHTML = timestamp;
        newMessageDiv.appendChild(timestampDiv);

        const userName = `${snap.val().userName}: `;
        const userNameDiv = document.createElement('div');
        userNameDiv.className = 'user-name';
        userNameDiv.innerHTML = userName;
        newMessageDiv.appendChild(userNameDiv);

        const userMessage = snap.val().userMessage;
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'user-message';
        userMessageDiv.innerHTML = userMessage;
        newMessageDiv.appendChild(userMessageDiv);

        chatBoxDiv.insertBefore(newMessageDiv, firstChild)
    }


    // loadMessages = () => {
    //     // Remove all previous listeners:
    //     firebase.database().ref('chat').off();

    //     // Loads the last 20 messages and listens for new ones:
    //     // const setMessage = data => {
    //     //     let val = data.val();
    //     //     this.displayMessage(data.key, val.text)
    //     // }
    //     console.log('in loadMessages')
    //     firebase.database().ref('chat').limitToLast(5).on('child_added', snap => {
    //         console.log(snap.val());
    //     })
    //     //, setMessage);
    //     firebase.database().ref('chat').limitToLast(5).on('child_changed', snap => {
    //         console.log(snap.val());
    //     })
    //     //, setMessage);
    // }

    // displayMessage = (key, text) => {
    //     let container = document.createElement('div');
    //     container.innerHTML = (
    //         '<div className="message" />'
    //     )
    // }

    handleSubmitMessage(event) {
        event.preventDefault();
        if (event.target.text.value) {
            firebase.database().ref('chat').push({
                createdAt: new Date().toString().slice(0, 24),
                userName: event.target.name.value,
                userMessage: event.target.text.value
            })
            .catch( error => console.error('Error writing to Firebase DB', error));
            event.target.text.value = '';
        }
    }

    render() {
        return (
            <div id="chatroom">

                <form className="input" onSubmit={this.handleSubmitMessage} >
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                    />
                    <input
                        type="text"
                        id="message"
                        name="text"
                        placeholder="Send a message"
                    />
                    <input
                        type="submit"
                        value="send"
                    />
                </form>

                <div className="historical-messages">
                    <div id="chatbox" />
                </div>

            </div>
        )
    }

}
