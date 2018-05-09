import React from "react";
import PropTypes from "prop-types";

import AlertLogic from "./../logic/alert.js";

class Alert extends React.Component {
  constructor() {
    super();
    this.state = {visable: false};
  }

  static propTypes = {
    invisable: PropTypes.bool
  }

  componentDidMount() {
    // Creates the element with 0 opacity.
    // Once visable is true, we transition to 1 opacity.
    setTimeout(() => this.setState({visable: true}), 0);
  }

  render() {
    let props = this.props;
    let visable = this.state.visable ? " alert-visable" : "";
    if(this.props.invisable) visable = "";
    return (
      <div className={props.cssClass + visable}
        onClick={() => AlertLogic.removeAlertWithId(props.id) }>
        <div className="alert-text">
          {props.message}
        </div>
      </div>
    );
  }
}

export default class AlertZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: props.messages, destroying: [] };
  }

  static propTypes = {
    invisable: PropTypes.bool,
    messages: PropTypes.array
  }

  componentWillReceiveProps(props) {
    // If the prop has removed the element, update the state
    for(let m of this.state.messages) {
      if(!props.messages.find(e => e.id === m.id))
        this._deleteMessage(m);
    }
    for(let m of props.messages) {
      if(!this.state.messages.find(e => e.id === m.id)) {
        let new_m = this.state.messages;
        new_m.push(m);
        this.setState( {messages:  new_m} );
      }
    }
  }

  _deleteMessage(mess) {
    this.setState( {destroying: this.state.destroying.concat([mess.id])} );
    setTimeout(() => this.setState({
      messages: this.state.messages.filter(e => e != mess),
      destroying: this.state.destroying.filter(ele => ele === mess.id)
    }), 200);
  }

  render() {
    return <div className="alert-zone">
      {
        this.state.messages.slice(0).reverse().map((message) =>
          <Alert key={message.id}
            id={message.id}
            invisable={(this.state.destroying.indexOf(message.id) > -1)}
            cssClass={message.cssClass}
            message={message.message}/>
        )
      }
    </div>;
  }
}
