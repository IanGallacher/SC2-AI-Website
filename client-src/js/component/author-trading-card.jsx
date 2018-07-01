import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Image } from "./image.jsx";
import UserTitle from "./user-title.jsx";

const default_avatar_path = require("./../../img/avatar.jpg");

export default class AuthorTradingCard extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      avatar: PropTypes.string,
      id: PropTypes.number,
      role: PropTypes.string,
      username: PropTypes.string
    })
  }

  render() {
    return (
      <Link to={`/authors/?author_id=${this.props.user.id}`}
        name="View Profile" id="profile"
        type="submit" className="trading-card">
        <UserTitle user={this.props.user}/>
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
