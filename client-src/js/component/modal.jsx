import React from "react";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidden: true };
    console.log("Constructor");
  }

  static propTypes = { modalContent: PropTypes.node }

  first_load = true;
  componentWillReceiveProps() {
    // If the prop has removed the element, update the state
    if(!this.first_load) this.setState({ hidden: false });
    else this.first_load = false;
  }

  toggleHidden = () => { this.setState({ hidden: !this.state.hidden}); }

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
