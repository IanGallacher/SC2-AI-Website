import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'

let error_table = {
  "presence" : "is required."
}

export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { error: "", username: "", password: "" };
    if(localStorage.getItem("access_token") === null)
      localStorage.setItem("access_token", "");
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.login(this);
  }

  render() {
    let login_message = ""
    if(this.props.location.state && this.props.location.state.from) {
      login_message = this.props.location.state.from.pathname + " requires login"
    }
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
    )
  }
}
