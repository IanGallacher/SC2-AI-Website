import 'normalize.css'; // Standardize the dom elements before continuing.
import './../../css/style.scss'


import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router,
         Route, Link, Prompt, Switch, Redirect } from 'react-router-dom'

import { AuthorBios } from './authors.js'
import { AdminControlPanel } from './admin.js'
import { Login, Logout, ResetPassword, SignUp } from './login.js'
import { Header } from './header.js'
import { ProfileSettings } from './profile.js'
import { PrivateRoute } from './requireuser.js'
import { Sidebar } from './sidebar.js'
import { FAQ, Learning, HelpfulResources } from './static-pages.js'
import { ResultTable } from './table.js'
import { PageNotFound } from './404.js'

import LoginLogic from './../logic/login.js'

export var API_URL = "http://107.161.27.148:3000/api"

class Season extends React.Component {
  constructor(props) {
    super(props);
    this.state = { season: { summary : [] } };
  }

  componentDidMount() {
    let request = new XMLHttpRequest();

    request.onload = function(e) {
      if (request.readyState === 4) {
        console.log(request.response); //Outputs a DOMString by default

        this.setState({
          season: JSON.parse(request.response)
        });
      }
    }.bind(this);

    request.open("get", API_URL + "/seasons", true);
    request.send();
  }

  render() {
    return (
      <div>
        <ResultTable label={this.state.season.name}
                     table={this.state.season.summary}
                     table_name={
                       [
                         "BotName",
                         "Author",
                         "Race",
                         "Matches",
                         "Wins",
                         "Win Pct"
                       ]
                     }/>
      </div>
    );
  }
}

class Bots extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bots: [] };
  }

  componentDidMount() {
    let request = new XMLHttpRequest();

    request.onload = function(e) {
      if (request.readyState === 4) {
        console.log(request.response); //Outputs a DOMString by default

        this.setState({
          bots: JSON.parse(request.response)
        });
      }
    }.bind(this);
    request.open("get", API_URL + "/bots", true);
    request.send();
  }

  render() {
    return (
      <div>
        <ResultTable label="Bots"
                     table={this.state.bots}
                     table_name={
                        [
                          "BotName",
                          "Author",
                          "Race"
                        ]
                      }/>
      </div>
    );
  }
}

class PageRouting extends React.Component {
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

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { access_token: LoginLogic.getAccessToken}
  }

// I am using a new experimental feature of ECMAscript.
// At the time I am writing this, the proposal is currently in stage 2.
// Instead of writing "this.login = this.login.bind(this);" in the constructor,
// you are able to use arrow notation instead for binding methods.
// This eliminates tons of boilerplate code instide the constructor.
  login = (ctx) => {
    LoginLogic.login(ctx).then((user_data) => {
      localStorage.setItem("access_token", user_data.id);
      localStorage.setItem("user_id", user_data.userId);
      this.setState({ access_token: LoginLogic.getAccessToken() });
    });
  }

  logout = (ctx) => {
    LoginLogic.logout(ctx).then((response) => {
      localStorage.setItem("access_token", "");
      localStorage.setItem("user_id", "");
      this.setState({ access_token: LoginLogic.getAccessToken() });
    });
  }

  signUp = (ctx) => {
    LoginLogic.signUp(ctx).then(function(response) {
      console.log(response)
      this.setState({ access_token: LoginLogic.getAccessToken() });
    });
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Header access_token={this.state.access_token}/>
          <div className="flex-horizontal-container">
          <Sidebar/>
            <div className="sidebar-placeholder"/>
            <div className="flex-vertical-container">
              <div className="page-area">
                <PageRouting/>
              </div>
            </div>
          </div>
        </React.Fragment>
      </Router>
    )
  }
}

render(<App/>, document.getElementById('app'));
