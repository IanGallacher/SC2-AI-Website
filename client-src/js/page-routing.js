import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import AuthorList from "./endpoint/author-list.js";
import AuthorProfile from "./endpoint/author-profile.js";
import AdminControlPanel from "./endpoint/admin.js";
import Bots from "./endpoint/bots.js";
import BotProfile from "./endpoint/bot-profile.js";
import Login from "./endpoint/login.js";
import ProfileSettings from "./endpoint/profile.js";
import { RequireLoggedInRoute } from "./logic/permission.js";
import RecentResults from "./endpoint/recent-results.js";
import ResetPassword from "./endpoint/reset-password.js";
import Season from "./endpoint/season.js";
import SignUp from "./endpoint/sign-up.js";
import SplashScreen from "./endpoint/splash-screen.js";
import TwitchStream from "./endpoint/twitch.js";
import FAQ from "./endpoint/faq.js";
import PageNotFound from "./endpoint/404.js";

function pageView(WrappedComponent) {
  return class pageViewWrapper extends React.Component {
    render() {
      return <div className="page-scroll-offset">
        <div className="page-area">
          <WrappedComponent props={{...this.props}}/>
        </div>
      </div>;
    }
  };
}

function PageRoute({component, render, ...props}) {
  return <div className="page-scroll-offset">
    <div className="page-area">
      <Route props={{...props}} component={component} render={render}/>
    </div>
  </div>;

}
PageRoute.propTypes = {
  render: PropTypes.func,
  component: PropTypes.node
};

export default class PageRouting extends React.Component {
  render() {
    return (
      <Switch>
        <PageRoute path="/results" component={RecentResults}/>
        <RequireLoggedInRoute path="/admin-control-panel"
          component={pageView(AdminControlPanel)}/>
        <PageRoute path="/login" render={props => <Login {...props}/>}/>
        <PageRoute path="/sign-up" render={props => <SignUp {...props}/>}/>
        <PageRoute path="/reset-password" component={ResetPassword}/>
        <Route path="/twitch" render={props => <TwitchStream {...props}/>}/>
        <PageRoute exact strict path="/authors" component={AuthorList}/>
        <PageRoute path="/authors/*" component={AuthorProfile}/>
        <RequireLoggedInRoute
          path="/my-profile"
          component={pageView(ProfileSettings)}/>
        <PageRoute path="/faq" component={FAQ}/>
        <PageRoute path="/bots" component={Bots}/>
        <PageRoute path="/bot/*" component={BotProfile}/>
        <PageRoute path="/season" component={Season}/>
        <Route exact strict path="/" component={SplashScreen}/>
        <PageRoute path="*" exact={true} component={PageNotFound}/>
      </Switch>
    );
  }
}
