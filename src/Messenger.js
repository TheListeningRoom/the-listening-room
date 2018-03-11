import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

export default class Messenger extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
    }

    componentDidMount() {
        const messaages = firebase.database().ref('chat')
        messaages.on('child_added', snap => {
            const message = `${snap.val().createdAt}\u00A0\u00A0\u00A0\u00A0 ${snap.val().text}`;
            const chatText = document.createElement('div');
            const chatBoxDiv = document.getElementById('chatbox');
            const firstChild = chatBoxDiv.firstChild;
            chatBoxDiv.insertBefore(chatText, firstChild).innerHTML = message
        })
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
                text: event.target.text.value
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
                        id="message"
                        name="text"
                        placeholder="Send a message"
                    />
                    <input
                        type="submit"
                        value="submit"
                    />
                </form>

                <div className="historical-messages">
                    <ul id="chatbox" />
                </div>

            </div>
        )
    }

}
