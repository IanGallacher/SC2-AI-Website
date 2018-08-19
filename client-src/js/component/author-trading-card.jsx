import React from "react";
import { Link } from "react-router-dom";

import { Image } from "./image.jsx";
import UserTitle from "./user-title.jsx";
import UserPropType from "./../custom-proptypes/user.js";

const default_avatar_path = require("./../../img/avatar.jpg");

export default class AuthorTradingCard extends React.Component {
  static propTypes = { user: UserPropType }

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
