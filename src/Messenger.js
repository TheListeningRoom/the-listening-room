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
            const message = snap.val().text
            console.log(message)
            const chatText = document.createElement('li')
            document.getElementById('chatbox').appendChild(chatText).innerHTML = message
        })
    }

    handleSubmitMessage(event) {
        event.preventDefault();
        firebase.database().ref('chat').push({
            text: event.target.text.value
        })
        event.target.text.value = '';
        
    }

    render() {
        return (
            <div id="chatroom">
                <ul id="chatbox">
                </ul>
                    <form className="input" onSubmit={this.handleSubmitMessage} >
                        <input type="text" id="message" name="text" placeholder="Send a message" />
                        <input type="submit" value="Submit" />
                    </form>
            </div>
        )
    }

}