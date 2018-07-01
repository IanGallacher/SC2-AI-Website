import React from "react";
import UserPropType from "./../custom-proptypes/user.js";

function renderUserName(user) {
  return <div className="trading-card-title">{user.username}</div>;
}

function renderRoleIfNecessary(user) {
  if(user.role != "user")
    return <div className="trading-card-subtitle">{ `${user.role}` }</div>;
  return null;
}

export default function UserTitle(props) {
  let user = props.user;
  return <React.Fragment>
    { renderUserName(user) }
    { renderRoleIfNecessary(user) }
  </React.Fragment>;
}
UserTitle.propTypes = { user: UserPropType };
