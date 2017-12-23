import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router,
         Route, Link, Prompt, Switch, Redirect } from 'react-router-dom'

import { AuthorBios } from './authors.js'
import { AdminControlPanel } from './admin.js'
import { Bots } from './bots.js'
import { Login, Logout, ResetPassword, SignUp } from './login.js'
import { ProfileSettings } from './profile.js'
import { PrivateRoute } from './requireuser.js'
import { FAQ, Learning, HelpfulResources } from './static-pages.js'
import { Season } from './season.js'
import { PageNotFound } from './404.js'
import LoginLogic from './../logic/login.js'


export default class PageRouting extends React.Component {
  render() {
    return (
        <Switch>
          <Route path="/home" component={Season}/>
          <Route path="/admin-control-panel"
                 component={AdminControlPanel}/>

          <Route path="/login"
                 render={(props) => <Login
                          {...props}
                          login={this.login}
                          access_token={LoginLogic.getAccessToken()}
                          />}/>

          <Route path="/logout"
                 render={(props) => <Logout
                          {...props}
                          logout={this.logout}
                          access_token={LoginLogic.getAccessToken()}
                          />}/>

          <Route path="/sign-up"
                 render={(props) => <SignUp
                          {...props}
                          signUp={this.signUp}
                          access_token={LoginLogic.getAccessToken()}
                          />}/>

          <Route path="/reset-password" component={ResetPassword}/>
          <Route path="/authors" component={AuthorBios}/>
          <Route path="/authors/*" component={AuthorBios}/>
          <PrivateRoute path="/my-profile" component={ProfileSettings}/>
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
