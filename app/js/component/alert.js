import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'

const Alert = (props) => {
  return (
    <div className="alert-error"><div className="alert-text">{props.message}</div></div>
  );
}

export class AlertZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  componentDidMount() {
    this.addMessage("asfdasdfaf");
  }


  addMessage = (message) => {
    let messages = this.state.messages;
    messages.push(message);
    this.setState({ messages: messages });
    setTimeout(this.removeOldestMessage.bind(this), 5000);
  }

  removeOldestMessage = (message) => {
    console.log(this.state);
    let messages = this.state.messages;
    messages.shift();
      console.log(messages);
    this.setState({ messages: messages });
      console.log(this.state);
  }

  render() {
    return (
      <div className="alert-zone">
      {
        (this.state.messages.length > 0) ? (
          this.state.messages.map((message) => {
            return ( <Alert message={message}/> );
          })
        ) : (
          <span/>
        )
      }
      </div>
    );
  }
}
