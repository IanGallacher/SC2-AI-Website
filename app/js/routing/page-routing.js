import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router,
         Route, Link, Prompt, Switch, Redirect } from 'react-router-dom'

import AuthorBios from './authors.js'
import AdminControlPanel from './admin.js'
import Bots from './bots.js'
import Login from './login.js'
import Logout from './logout.js'
import ProfileSettings from './profile.js'
import { RequireLoggedInRoute } from './requireuser.js'
import ResetPassword from './reset-password.js'
import Season from './season.js'
import SignUp from './sign-up.js'
import { FAQ, Learning, HelpfulResources } from './static-pages.js'
import PageNotFound from './404.js'

import LoginLogic from './../logic/login.js'


export default class PageRouting extends React.Component {
  render() {
    return (
        <Switch>
          <Route path="/home" component={Season}/>
          <RequireLoggedInRoute path="/admin-control-panel"
                 component={AdminControlPanel}/>

          <Route path="/login"
                 render={(props) => <Login
                          {...props}
                          login={this.props.ctx.login}
                          access_token={LoginLogic.getAccessToken()}
                          />}/>

          <Route path="/logout"
                 render={(props) => <Logout
                          {...props}
                          logout={this.props.ctx.logout}
                          access_token={LoginLogic.getAccessToken()}
                          />}/>

          <Route path="/sign-up"
                 render={(props) => <SignUp
                          {...props}
                          signUp={this.props.ctx.signUp}
                          access_token={LoginLogic.getAccessToken()}
                          />}/>

          <Route path="/reset-password" component={ResetPassword}/>
          <Route path="/authors" component={AuthorBios}/>
          <Route path="/authors/*" component={AuthorBios}/>
          <RequireLoggedInRoute path="/my-profile" component={ProfileSettings}/>
          <Route path="/learning" component={Learning}/>
          <Route path="/faq" component={FAQ}/>
          <Route path="/helpful-resources" component={HelpfulResources}/>
          <Route path="/bots" component={Bots}/>
          <Route path="/season" component={Season}/>
          <Route path="*" exact={true} component={PageNotFound}/>
        </Switch>
    );
  }
}
