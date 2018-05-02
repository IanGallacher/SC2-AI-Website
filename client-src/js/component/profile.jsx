import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { API_URL } from "./../routing/app.js";
import BotTable from "./bots.jsx";
import { Image, EditableImage } from "./image.jsx";

const default_avatar_path = require("./../../img/avatar.jpg");

export class AuthorTradingCard extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      avatar: PropTypes.string,
      id: PropTypes.number,
      username: PropTypes.string
    })
  }

  render() {
    return (
      <Link to={`/authors/?author_id=${this.props.user.id.toString()}`}
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

export class AuthorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: [] };
  }

  static propTypes = {
    author_id: PropTypes.string,
    editing: PropTypes.bool,
    profile: PropTypes.shape({
      username: PropTypes.string,
      avatar: PropTypes.string
    })
  }

  getAuthorData(author_id) {
    if (author_id == "") return;
    axios.get(`${API_URL}/authors/${author_id}`)
      .then(response => this.setState({ profile: response.data }))
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.getAuthorData(this.props.author_id);
  }

  componentWillReceiveProps(nextProps) {
    this.getAuthorData(nextProps.author_id);
  }

  render() {
    return (
      <div className="trading-card-horizontal">
        <title>{this.state.profile.username}</title>
        <div className="grid-one-quarter">
          <EditableImage
            img={this.state.profile.avatar}
            fallback={default_avatar_path}
            className="img-thumbnail"
            editing={this.props.editing}
            edit_url={`/users/${this.props.author_id}/create_avatar`}
          />
        </div>
        <div className="grid-three-quarter">
          {
          /*
          <div className="grid-one-quarter">
              <ul className="list-group">
                <li className="list-group-item text-muted">Profile: </li>
                <li className="list-group-item text-right">
                  <span className="pull-left">
                    Joined:
                  </span>{this.state.profile.joindate}</li>
                <li className="list-group-item text-right">
                  <span className="pull-left">
                    Real name:
                  </span>{this.state.profile.name}</li>
              </ul>
              { (this.state.profile.website) ? (
                  <div className="panel panel-default">
                    <div className="panel-heading">Website:</div>
                    <div className="panel-body">
                      {this.state.profile.website}
                    </div>
                  </div>
                ) : (
                  <span/>
                )
              }

              <div className="panel panel-default">
                <div className="panel-heading">Github:</div>
                <div className="panel-body">
                  {this.state.profile.github}
                </div>
              </div>

            </div>
            */
          }
          <div className="tab-content">
            <div className="tab-pane active" id="home">
              {
                (this.state.profile.username) ? (
                  <BotTable author_id={this.state.profile.id}/>
                ) : (
                  <div/>
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
