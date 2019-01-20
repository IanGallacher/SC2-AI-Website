import React from "react";
import UserPropType from "./../custom-proptypes/user.js";

let PATREON_TIER_CLASSES = {
  "Gold": "patreon-tier-gold",
  "Silver": "patreon-tier-silver",
  "Bronze": "patreon-tier-bronze"
};


function renderPatreonStar(patreon_tier) {
  let patreon_tier_class = "";
  if(patreon_tier) patreon_tier_class = PATREON_TIER_CLASSES[patreon_tier];
  return <React.Fragment>
    { patreon_tier ? <i className={`fa fa-star ${patreon_tier_class}`}/> : null }
  </React.Fragment>;
}

export function renderNameWithPatreon(name, patreon_tier) {
  return <React.Fragment>
    {renderPatreonStar(patreon_tier)}
    {name}
  </React.Fragment>;
}

function renderUserTitle(user) {
  return <div className="trading-card-title">
    {renderNameWithPatreon(user.username, user.patreon_tier)}
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
    { renderUserTitle(user) }
    { renderRoleIfNecessary(user) }
  </React.Fragment>;
}
UserTitle.propTypes = { user: UserPropType };
