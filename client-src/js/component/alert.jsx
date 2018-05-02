import React from "react";
import PropTypes from "prop-types";

import AlertLogic from "./../logic/alert.js";

const Alert = props => {
  return (
    <div className={props.cssClass}
      onClick={() => AlertLogic.removeAlertWithId(props.id)}>
      <div className="alert-text">
        {props.message}
      </div>
    </div>
  );
};
Alert.propTypes = {
  cssClass: PropTypes.string,
  message: PropTypes.string,
  id: PropTypes.number
};

export default class AlertZone extends React.Component {
  static propTypes = { messages: PropTypes.array };

  render() {
    return (
      <div className="alert-zone">
        {
          (this.props.messages.length > 0) &&
            this.props.messages.map(message =>
              <Alert key={message.id}
                id={message.id}
                cssClass={message.cssClass}
                message={message.message}/>
            )
        }
      </div>
    );
  }
}
