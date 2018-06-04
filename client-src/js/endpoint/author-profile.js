import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router";

import { API_URL } from "./../app.js";
import { EditableImage } from "./../component/image.jsx";
import FetchTable from "./../component/table-fetch.jsx";
import { TextInput } from "./../component/form.jsx";
import FormZone from "./../component/form-zone.jsx";

const default_avatar_path = require("./../../img/avatar.jpg");


function AuthorDetails(props) {
  if (props.editing) return <FormZone
    method="patch"
    uploadPath={props.edit_url}>
    <TextInput name="github"
      type="text"
      placeholder={props.profile.github ? props.profile.github : "Github"}
      className="text-input"/>
  </FormZone>;
  if (props.profile.github) return <div className="author-details">
    <div>Github: {props.profile.github && props.profile.github} </div>
  </div>;
  return null;
}
AuthorDetails.propTypes = {
  editing: PropTypes.bool,
  edit_url: PropTypes.string,
  profile: PropTypes.object
};

class AuthorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: {} };
  }

  static propTypes = {
    author_id: PropTypes.number,
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
    let author_id = this.props.author_id;
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
              edit_url={`/users/${this.props.author_id}/create_avatar`}/>
            <AuthorDetails
              editing={this.props.editing}
              profile={this.state.profile}
              edit_url={`/users/${this.props.author_id}`}/>
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
                      this.props.history.push(`/bot/?bot_id=${row.id}`);
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
                    headerName:"Win Rate",
                    displayValue: row => {
                      // Avoid dividing by 0.
                      if(row.match_count === 0) return ("N/A");
                      let win_ratio = row.win_count / row.match_count;
                      return `${win_ratio.toFixed(2) * 100}%`;
                    },
                    displayType:"text"
                  },
                  {
                    headerName:"MMR",
                    fieldName:"current_mmr",
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

            </div>
            */
          }
        </div>
      </div>
    );
  }
}
export default withRouter(AuthorProfile);
