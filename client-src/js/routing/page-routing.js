import React from "react";
import { Route, Switch } from "react-router-dom";

import AuthorList from "./author-list.js";
import AuthorProfile from "./author-profile.js";
import AdminControlPanel from "./admin.js";
import Bots from "./bots.js";
import BotProfile from "./bot-profile.js";
import Login from "./login.js";
import ProfileSettings from "./profile.js";
import { RequireLoggedInRoute } from "./../logic/permission.js";
import RecentResults from "./recent-results.js";
import ResetPassword from "./reset-password.js";
import Season from "./season.js";
import SignUp from "./sign-up.js";
import SplashScreen from "./splash-screen.js";
import FAQ from "./faq.js";
import PageNotFound from "./404.js";

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
