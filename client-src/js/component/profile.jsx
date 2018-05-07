import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Image } from "./image.jsx";

const default_avatar_path = require("./../../img/avatar.jpg");

export default class AuthorTradingCard extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      avatar: PropTypes.string,
      id: PropTypes.number,
      username: PropTypes.string
    })
  }

  render() {
    return (
      <Link to={`/authors/?author_id=${this.props.user.id}`}
        name="View Profile" id="profile"
        type="submit" className="trading-card">
        <title>{this.props.user.username}</title>
        <Image
          img={this.props.user.avatar}
          fallback={default_avatar_path}
          className="img-thumbnail"
        />
        <div className="text-center">
          <p> View Profile </p>
        </div>
      </Link>
    );
  }
}
