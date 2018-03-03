import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import { API_URL } from './app.js'

import { Bots } from './../component/bots.js'

const default_avatar_path = require("./../../img/avatar.jpg");

class AuthorAvatar extends React.PureComponent {
  render() {
    return (this.props.avatar) ?
      (
        <img className="img-thumbnail grid-one-quarter"
           src={this.props.avatar}/>
      ) : (
        <img className="img-thumbnail grid-one-quarter"
           src={"/" + default_avatar_path}/>
      )
  }
}

class AuthorTradingCard extends React.Component {
  render() {
    return (
      <div className="trading-card">
        <h3>{this.props.user.username}</h3>
        <img className="img-thumbnail"
             src={"/" + default_avatar_path}
             alt={this.props.user.username}/>
        <div className="text-center">
          <p>
            <Link to={"/authors/?author=" + this.props.user.id.toString()}
               name="View Profile" id="profile"
               className="btn btn-lg btn-primary btn-block"
               type="submit">View Profile
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export class AuthorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: [] };
  }

  componentDidMount() {
    const axios_param = {
                      params: {
                        filter: {
                          "where": {
                            "id": this.props.author_id
                          }
                        }
                      }
                    };
    axios.get(API_URL + "/authors", axios_param)
    .then((response) => {
      console.log(response.data);

      this.setState({
        profile: response.data[0]
      });
    })
    .catch((error) => {
      console.log("ERROR");
      console.log(error);
    });
  }

  render() {
  console.log(this.state.profile.username);
    return (
      <div className="trading-card-horizontal">
        <div>
          <h1>{this.state.profile.username}</h1>
        </div>
        <AuthorAvatar avatar={this.state.profile.avatar}/>
        <div className="grid-three-quarter">
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

              <div className="panel panel-default">
                <div className="panel-heading">Website</div>
                <div className="panel-body">
                  {this.state.profile.website}
                </div>
              </div>

              <div className="panel panel-default">
                <div className="panel-heading">Github</div>
                <div className="panel-body">
                  {this.state.profile.github}
                </div>
              </div>

            </div>
          <div className="grid-three-quarter">
            <div className="tab-content">
              <div className="tab-pane active" id="home">
              {
                (this.state.profile.username) ? (
                  <Bots author={this.state.profile}/>
                ) : (
                  <div/>
                )
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class AuthorBios extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { author: [], author_id: -1, profile: [] };
  }

  setAuthorFromURL() {
    let author_id = -1;
    let profile = [];
    const search = this.props.location.search;
    if(search!="") {
      const params = new URLSearchParams(search);
      author_id = params.get('author');
    }
    this.setState({
      profile: this.state.author[author_id-1],
      author_id: author_id
    });
  }

  componentDidMount() {
    // Get all the authors from the server.
    const url = API_URL + "/authors";

    axios.get(url)
    .then((response) => {
      console.log(response.data);

      this.setState({
        author: response.data
      });
      this.setAuthorFromURL();
    })
    .catch((error) => {
      console.log("ERROR");
      console.log(error);
    });
  }

  componentDidUpdate() {
    this.setAuthorFromURL();
  }

  render() {
    if(this.state.author_id == -1)
    {
      return (
        <div className="author-content">
          <h3>Authors</h3>
            {
              this.state.author.map(function(user) {
              return (
                <div key={user.id}>
                  <AuthorTradingCard user={user}/>
                </div>
              );
            })
          }
        </div>
      );
    }
    else {
      if(this.state.profile != []) {
        return (
          <AuthorProfile author_id={this.state.author_id}/>
        );
      } else {
        return ("Warning: no profile");
      }
    }
  }
}
