import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import { API_URL } from './../routing/app.js'

import BotTable from './bots.js'

const default_avatar_path = require("./../../img/avatar.jpg");

class AuthorAvatar extends React.PureComponent {
  render() {
    return (this.props.avatar) ?
      (
        <img className="img-thumbnail"
           src={this.props.avatar}/>
      ) : (
        <img className="img-thumbnail"
           src={default_avatar_path}/>
      )
  }
}

export class AuthorTradingCard extends React.Component {
  render() {
    return (
      <div className="trading-card">
      <Link to={"/authors/?author_id=" + this.props.user.id.toString()}
                     name="View Profile" id="profile"
                     type="submit">
        <title>{this.props.user.username}</title>
        <AuthorAvatar avatar={this.props.user.avatar}/>
        <div className="text-center">
          <p>
View Profile
          </p>
        </div>
      </Link>
      </div>
    );
  }
}

export class AuthorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: [] };
  }

  getAuthorData(author_id) {
    if (author_id == "") return;
    axios.get(API_URL + "/authors/" + author_id)
    .then((response) => {
      this.setState({
        profile: response.data
      });
    })
    .catch((error) => {
      console.log("ERROR");
      console.log(error);
    });
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
          <AuthorAvatar avatar={this.state.profile.avatar}/>
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
