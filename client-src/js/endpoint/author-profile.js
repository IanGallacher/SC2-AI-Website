import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import UserPropType from "./../custom-proptypes/user.js";
import { withRouter } from "react-router";

import { ModalContext } from "./../context/modal-context.js";

import { API_URL } from "./../app.js";
import { EditableImage } from "./../component/image.jsx";
import BotUpload from "./../component/bot-upload.jsx";
import FetchTable from "./../component/table-fetch.jsx";
import { TextInput } from "./../component/form.jsx";
import FormZone from "./../component/form-zone.jsx";
import UserTitle from "./../component/user-title.jsx";

const default_avatar_path = require("./../../img/avatar.jpg");


function AuthorDetails(props) {
  if (props.editing) return <FormZone
    method="patch" uploadPath={props.edit_url}>
    <TextInput name="github"
      type="text"
      placeholder={props.profile.github ? props.profile.github : "Github"}
      className="text-input"/>
  </FormZone>;
  if (props.profile.github) return <div className="author-details">
    <div className="profile-details">
      <a href={props.profile.github}>
        <i className="fab fa-github"></i>
        &nbsp;Github: {props.profile.github}
      </a>
    </div>
  </div>;
  return null;
}
AuthorDetails.propTypes = {
  editing: PropTypes.bool,
  edit_url: PropTypes.string,
  profile: UserPropType
};

function renderBotDetails(bot) {
  return <BotUpload
    bot={bot}
    uploadPath={`/bots/${bot.id}`}
    label="asdf"
    method="patch"
  />;
}

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
    profile: UserPropType
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

  UNSAFE_componentWillReceiveProps() {
    this.getAuthorData(this.getAuthorId());
  }

  renderRoleIfNecessary = (role) => {
    if(role != "user")
      return <div className="trading-card-subtitle">{ `${role}` }</div>;
    return null;
  }

  render() {
    return (
      <ModalContext.Consumer>{modal => <div className="trading-card-horizontal">
        <UserTitle user={this.state.profile}/>
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
                    columnLabel:"Bot name",
                    fieldName:"name",
                    sortValue: row => row.name.toLowerCase(),
                    onClick: row => {
                      this.props.history.push(`/bot/?bot_id=${row.id}`);
                    }
                  },
                  {
                    columnLabel:"Race",
                    fieldName:"race",
                    sortValue: row => row.race.toLowerCase(),
                    onClick: row => {
                      this.props.history.push(`/bots/?race=${row.race}`);
                    }
                  },
                  {
                    columnLabel:"Win Rate",
                    render: row => {
                      // Avoid dividing by 0.
                      if(row.match_count === 0) return ("N/A");
                      let win_ratio = row.win_count / row.match_count;
                      return `${win_ratio.toFixed(2) * 100}%`;
                    }
                  },
                  {
                    columnLabel:"MMR",
                    fieldName:"current_mmr"
                  },
                  {
                    columnLabel:"Edit",
                    fieldName:"current_mmr",
                    showColumnIf: () => this.props.editing,
                    onClick: row => {
                      modal.showModal(renderBotDetails(row));
                    },
                    render: row => <div className="fa fa-edit"/>
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
      </div>}
      </ModalContext.Consumer>
    );
  }
}
export default withRouter(AuthorProfile);
