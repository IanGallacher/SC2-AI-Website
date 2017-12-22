import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'

let error_table = {
  "presence" : "is required."
}

function isLoggedIn(){
  return (localStorage.getItem("access_token") == "" ? false : true)
}

class Error extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let second_half = "unkown error";
    if(error_table[this.props.errors]) {
      second_half = error_table[this.props.errors];
    }
    return(
      <div>{this.props.field + " " +  second_half}</div>
    );
  }
}

export class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { error: "" };
    if(localStorage.getItem("access_token") === null)
      localStorage.setItem("access_token", "");

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
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
            className="form-signin"
            onSubmit={this.onSubmit}>
        <h2 className="form-signin-heading">Please sign in</h2>
        <input name="username" type="text" className="form-control" placeholder="Username" onChange={this.onChange} autoFocus />
        <input name="password" type="password" className="form-control" placeholder="Password" onChange={this.onChange} />
        <button name="Submit" id="submit" className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <Link to="/sign-up" className="btn btn-lg btn-primary btn-block">Create new account</Link>

        <div id="message">{ this.state.error } { login_message }</div>
        <Link to="/reset-password">Forgot Password</Link>
      </form>
    )
  }
}

export class Logout extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.logout(this);
  }

  render() {
    return (
      <div>
      LOGOUT!
      </div>
    )
  }
}

export class ResetPassword extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    localStorage.setItem("access_token", "");
    localStorage.setItem("user_id", "");
  }

  render() {
    return (
      <div>
      ResetPassword!
      </div>
    )
  }
}

export class SignUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { errors: [] };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.signUp(this);
  }

  render() {
    return (
      <form name="form-signup" className="form-signup center-me" onSubmit={this.onSubmit}>
        <h2 className="form-signup-heading">Register</h2>
        <input name="username"
               type="text"
               className="form-control"
               placeholder="Username"
               onChange={this.onChange}
               autoFocus />

        <input name="email"
               type="text"
               className="form-control"
               placeholder="Email"
               onChange={this.onChange} />
        <br/>

        <input name="password"
               type="password"
               className="form-control"
               placeholder="Password"
               onChange={this.onChange} />

        <input name="password-confirm"
               type="password"
               className="form-control"
               placeholder="Confirm Password"
               onChange={this.onChange} />
        <br/>
        <button name="Submit"
                className="btn btn-lg btn-primary btn-block"
                type="submit">Sign up</button>

        <div id="message">{ this.state.errors.map(function(error) {
          return(<div><Error field={error.field} errors={error.errors}/></div>);
        })}</div>
      </form>
    )
  }
}
