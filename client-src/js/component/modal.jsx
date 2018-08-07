import React from "react";
import PropTypes from "prop-types";

import { ModalContext } from "./../context/modal-context.js";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      modalContent: "No content"
    };
  }

  static propTypes = { modalContent: PropTypes.node }

  first_load = true;
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if(this.first_load) { this.first_load = false; return; }
    if(this.props.modalContent == nextProps.modalContent) return;
  }

  closeModal = () => {
    this.setState({ hidden: true });
  }

  showModal = modalContent => {
    this.setState({modalContent, hidden: false});
  }

  render() {
    let is_hidden_class = (this.state.hidden) ? "modal-hidden" : "";

    return <div className={`modal-background ${is_hidden_class}`}>
      <div className="modal-content">
        <span className="modal-exit" onClick={this.closeModal}>&times;</span>
        {this.state.modalContent}
      </div>
    </div>;
  }
}
