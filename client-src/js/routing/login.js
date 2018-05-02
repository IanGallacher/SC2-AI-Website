import React from "react";
import { Link } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";

import AlertLogic from "./../logic/alert.js";
import LoginLogic from "./../logic/login.js";

export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { error: "", username: "", password: "" };
  }

  static propTypes = { history: ReactRouterPropTypes.history }

  onChange = e => { this.setState({ [e.target.name]: e.target.value }); }

  onSubmit = event => {
    event.preventDefault();
    LoginLogic.login(this.state).then(() => {
      AlertLogic.addMessage("Login successful", "alert-success");

      // After logging in successfuly, redirect the user to the homepage.
      this.props.history.push("/");
    });
  }

  render() {
    let login_message = "";
    // if(this.props.location.state && this.props.location.state.from) {
    //   login_message = `${this.props.location.state.from.pathname} requires login`;
    // }
    return (
      <form name="login-form"
        className="flex-vertical form-signin"
        onSubmit={this.onSubmit}>
        <h2 className="form-signin-heading">Please sign in</h2>
        <input name="username"
          type="text"
          className="text-input"
          placeholder="Username"
          onChange={this.onChange} autoFocus />
        <input name="password"
          type="password"
          className="text-input"
          placeholder="Password"
          onChange={this.onChange} />
        <br/>
        <button name="Submit"
          id="submit"
          className="btn btn-lg btn-primary"
          type="submit">
                  Sign in
        </button>
        <Link to="/sign-up">
                Create new account
        </Link>

        <div id="message">{ this.state.error } { login_message }</div>
        <Link to="/reset-password">Forgot Password</Link>
      </form>
    );
  }
}
