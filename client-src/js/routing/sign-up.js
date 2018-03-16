import React from 'react'
import { render } from 'react-dom'

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

export default class SignUp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.signUp(this);
  }

  render() {
    return (
      <form name="form-signup"
            className="form-signup center-me"
            onSubmit={this.onSubmit}>
        <h2 className="form-signup-heading">Register</h2>
        <input name="username"
               type="text"
               className="form-text-input-box"
               placeholder="Username"
               onChange={this.onChange}
               autoFocus />

        <input name="email"
               type="text"
               className="form-text-input-box"
               placeholder="Email"
               onChange={this.onChange} />
        <br/>

        <input name="password"
               type="password"
               className="form-text-input-box"
               placeholder="Password"
               onChange={this.onChange} />

        <input name="password-confirm"
               type="password"
               className="form-text-input-box"
               placeholder="Confirm Password"
               onChange={this.onChange} />
        <br/>
        <button name="Submit"
                className="btn btn-lg btn-primary btn-block"
                type="submit">Sign up</button>
      </form>
    )
  }
}
