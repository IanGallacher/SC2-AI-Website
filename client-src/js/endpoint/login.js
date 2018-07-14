import React from "react";
import { Link } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";

import AlertLogic from "./../logic/alert.js";
import LoginLogic from "./../logic/login.js";

import { TextInput } from "./../component/form.jsx";

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
      AlertLogic.addSuccess("Login successful");

      // After logging in successfuly, redirect the user to the homepage.
      this.props.history.push("/");
    });
  }

  render() {
    return (
      <form name="login-form"
        className="flex-vertical form-container"
        onSubmit={this.onSubmit}>
        <h2 className="form-signin-heading">Please sign in</h2>
        <TextInput name="username"
          type="text"
          placeholder="Username"
          onChange={this.onChange} autoFocus />
        <TextInput name="password"
          type="password"
          placeholder="Password"
          onChange={this.onChange} />
        <br/>
        <button name="Submit"
          id="submit"
          className="btn btn-lg btn-primary"
          type="submit">
                  Sign in
        </button>
        <br/>
        <Link to="/sign-up">Create new account</Link>
        <div id="message">{ this.state.error }</div>
        <Link to="/reset-password">Forgot Password</Link>
      </form>
    );
  }
}
