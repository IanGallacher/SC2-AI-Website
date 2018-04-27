import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidden: true }
  }
  first_load = true;
  componentWillReceiveProps(props) {
    // If the prop has removed the element, update the state
    console.log("asdf")
    if(!this.first_load) this.setState({ hidden: false });
    else this.first_load = false;
  }

  _deleteMessage(mess) {
    this.setState( {destroying: this.state.destroying.concat([mess.id])} )
    setTimeout(() => {
        this.setState({ messages: this.state.messages.filter(e => e != mess),
                        destroying: this.state.destroying.filter(
                          ele => ele === mess.id)})
      }
    , 200);
  }

  toggleHidden = () => {
    this.setState({ hidden: !this.state.hidden})
  }

  render() {
    let is_hidden_class = (this.state.hidden) ? "modal-hidden" : "";
    return <div className={`modal-background ${is_hidden_class}`}>
      <div className="modal-content">
        <span className="modal-exit" onClick={this.toggleHidden}>&times;</span>
        {this.props.modalContent}
      </div>
    </div>;
  }
}
