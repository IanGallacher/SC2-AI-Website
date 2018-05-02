import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";

import LoginLogic from "./../logic/login.js";
import { UserContext } from "./../context/user-context.js";

export function RequireLoggedInRoute ({
  component: Component,
  ...props
}) {
  return (
    <Route render={() => LoginLogic.isLoggedIn()
      ? <Component {...props}/>
      : <Redirect to={{pathname: "/login", state: {from: props.location}}} />}
    />
  );
}
RequireLoggedInRoute.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
  component: PropTypes.node
};

export function RenderIfLoggedOut(props) {
  return <UserContext.Consumer>
    { v => (v.username === "") && props.children }
  </UserContext.Consumer>;
}
RenderIfLoggedOut.propTypes = { children: PropTypes.node };

export function RenderIfLoggedIn(props) {
  return <UserContext.Consumer>
    { v => (v.username !== "") && props.children }
  </UserContext.Consumer>;
}
RenderIfLoggedIn.propTypes = { children: PropTypes.node };

export function RenderIfRole({role, ...props}) {
  return <UserContext.Consumer>
    { v => (v.role === role) && props.children }
  </UserContext.Consumer>;
}
RenderIfRole.propTypes = { role: PropTypes.string, children: PropTypes.node };
