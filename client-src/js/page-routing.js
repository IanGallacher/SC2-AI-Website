import React from "react";
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
import FAQ from "./endpoint/faq.js";
import PageNotFound from "./endpoint/404.js";

export default class PageRouting extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={SplashScreen}/>
        <Route path="/results" component={RecentResults}/>
        <RequireLoggedInRoute path="/admin-control-panel"
          component={AdminControlPanel}/>

        <Route path="/login"render={props => <Login {...props}/>}/>
        <Route path="/sign-up" render={props => <SignUp {...props}/>}/>

        <Route path="/reset-password" component={ResetPassword}/>
        <Route exact strict path="/authors" component={AuthorList}/>
        <Route path="/authors/*" component={AuthorProfile}/>
        <RequireLoggedInRoute path="/my-profile" component={ProfileSettings}/>
        <Route path="/faq" component={FAQ}/>
        <Route path="/bots" component={Bots}/>
        <Route path="/bot/*" component={BotProfile}/>
        <Route path="/season" component={Season}/>
        <Route path="*" exact={true} component={PageNotFound}/>
      </Switch>
    );
  }
}
