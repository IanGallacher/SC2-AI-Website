import axios from "axios";
import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";

import { API_URL } from "./app.js";
import { EditableImage } from "./../component/image.jsx";
import FetchTable from "./../component/table-fetch.jsx";

const default_avatar_path = require("./../../img/avatar.jpg");

class AuthorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: {} };
  }

  static propTypes = {
    author_id: PropTypes.string,
    editing: PropTypes.bool,
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location.isRequired,
    profile: PropTypes.shape({
      username: PropTypes.string,
      avatar: PropTypes.string
    })
  }

  getAuthorData(author_id) {
    if (author_id == "") return;

    axios.get(`${API_URL}/authors/${author_id}`)
      .then(response => this.setState({ profile: response.data }) );
  }

  getAuthorId() {
    let author_id = -1;
    const search = this.props.location.search;
    if(search != "") {
      const params = new URLSearchParams(search);
      author_id = params.get("author_id");
    }
    return author_id;
  }

  componentDidMount() {
    this.getAuthorData(this.getAuthorId());
  }

  componentWillReceiveProps() {
    this.getAuthorData(this.getAuthorId());
  }

  render() {
    return (
      <div className="trading-card-horizontal">
        <title>{this.state.profile.username}</title>
        <div className="flex-horizontal">
          <div className="trading-card-details-img-zone">
            <EditableImage
              img={this.state.profile.avatar}
              fallback={default_avatar_path}
              className="img-thumbnail"
              editing={this.props.editing}
              edit_url={`/users/${this.props.author_id}/create_avatar`}
            />
          </div>
          {
            (this.state.profile.username) ? (
              <FetchTable url={`${API_URL}/users/${this.state.profile.id}/bots`}
                schema={[
                  {
                    headerName:"Bot name",
                    fieldName:"name",
                    displayType:"text",
                    onClick: (row) => {
                      this.props.history.push(`/bots/?name=${row.name}`);
                    }
                  },
                  {
                    headerName:"Author",
                    fieldName:"author",
                    displayType:"text",
                    onClick: (row) => {
                      this.props.history.push(`/authors/?author_id=${row.owner_id}`);
                    }
                  },
                  {
                    headerName:"Race",
                    fieldName:"race",
                    displayType:"text",
                    onClick: (row) => {
                      this.props.history.push(`/bots/?race=${row.race}`);
                    }
                  },
                  {
                    headerName:"Games Won",
                    fieldName:"win_count",
                    displayType:"text"
                  },
                  {
                    headerName:"Games Played",
                    fieldName:"match_count",
                    displayType:"text"
                  }
                ]}/>
            ) : (
              <div/>
            )
          }
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
        </div>
      </div>
    );
  }
}
export default withRouter(AuthorProfile);
