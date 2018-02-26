import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import { API_URL } from './app.js'

const default_avatar_path = require("./../../img/avatar.jpg");

class AuthorTradingCard extends React.Component {

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
          { this.state.author.map(function(user) {
            return (
              <div key={user.id}>
                <div className="col-md-3">
                  <img className="img-thumbnail"
                       src={"/" + default_avatar_path}
                       alt={user.username}/>
                  <div className="text-center">
                    <h3>{user.username}</h3>
                    <p>
                      <Link to={"/authors/?author=" + user.id.toString()}
                         name="View Profile" id="profile"
                         className="btn btn-lg btn-primary btn-block"
                         type="submit">View Profile
                      </Link>
                    </p>
                  </div>
                </div>
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
          <div>
            <div className="author-trading-card">
          		<div>
                <h1>{this.state.profile.username}</h1>
              </div>
            	<div>
                <img className="img-thumbnail"
                     src={this.state.profile.avatar}
                     alt={this.state.profile.username}/>
              </div>
          	</div>
            <div className="row">
          		<div className="col-sm-3">

                  <ul className="list-group">
                    <li className="list-group-item text-muted">Profile</li>
                    <li className="list-group-item text-right">
                      <span className="pull-left">
                        <strong>Joined</strong>
                      </span>{this.state.profile.joindate}</li>
                    <li className="list-group-item text-right">
                      <span className="pull-left">
                        <strong>Real name</strong>
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
            	<div className="col-sm-9">
                  <div className="tab-content">
                    <div className="tab-pane active" id="home">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Bot Name</th>
                              <th>Race</th>
                              <th>Season</th>
                              <th>Win Pct</th>
                              <th>Position</th>
                            </tr>
                          </thead>
                          <tbody id="items">
                          </tbody>
                        </table>
                      </div>
                     </div>
                  </div>
                </div>
            </div>
          </div>
        );
      } else {
        return ("Warning: no profile");
      }
    }
  }
}
