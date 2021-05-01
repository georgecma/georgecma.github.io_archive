import React from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery"

const roomId = "test"

class ChatroomComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

    // init with api call to fetch historical messages
    componentDidMount() {
        this.getHistoricalMessages();
    }
    getHistoricalMessages() {
        $.getJSON('http://localhost:4000/query_messages/init', (response) =>
            {
                this.setState({ messages: response.data })
                console.log(response.data)
            }
        )
    }
    
    // send message function
    sendMessage(text) {
        if (text == '') {
            return 
        }
        var username = "self-test"
        var timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ')
        console.log("sending message", timestamp, username, text)
        $.post(
            'http://localhost:4000/query_messages/',
            {
                datetime: timestamp,
                user: username,
                message: text, 
            }, 
        ). then ( this.getOneMessage())
    }

    getOneMessage() {
        console.log('success, getting one message')
        $.getJSON('http://localhost:4000/query_messages/').then((response) =>
        {
            var joined = this.state.messages.concat(response.data);
            console.log('koined', joined);
            this.setState({ messages: joined });
        }
    )
    }

  render() {
    return (
        <div className="app">
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages}
        />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }
}

class MessageList extends React.Component {
  render() {
    return (
      <ul className="message-list">
        {this.props.messages.map((message) => {
          return (
              <li className="message">
            <div>key={message.id} {message.timestamp} {message.user} {message.message}</div>
            </li>
          );
        })}
      </ul>
    );
  }
}

class SendMessageForm extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

    handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: "",
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          onChange={this.handleChange}
          value={this.state.message}
          placeholder=""
          type="text"
        />
      </form>
    );
  }
}

export default ChatroomComponent;
