import React from "react";
import UserPropType from "./../custom-proptypes/user.js";

let PATREON_TIER_CLASSES = {
  "Gold": "patreon-tier-gold",
  "Silver": "patreon-tier-silver",
  "Bronze": "patreon-tier-bronze"
};

function renderUserName(user) {
  let patreon_tier = user.patreon_tier;
  let patreon_tier_class = "";
  if(patreon_tier) patreon_tier_class = PATREON_TIER_CLASSES[patreon_tier];
  return <div className="trading-card-title">
    {patreon_tier ? <i className={`fa fa-star ${patreon_tier_class}`}/> : null}
    {user.username}
  </div>;
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
