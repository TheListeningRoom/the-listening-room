import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

export default class Messenger extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
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
                <div id="chatbox">
                </div>
                    <form className="input" onSubmit={this.handleSubmitMessage} >
                        <input type="text" id="message" name="text" placeholder="Send a message" />
                        <input type="submit" value="Submit" />
                    </form>
            </div>
        )
    }

}