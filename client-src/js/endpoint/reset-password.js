import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";

import {TextInput} from "../component/form";
import LoginLogic from "../logic/login";
import ResetPasswordLogic from "../logic/reset-password";
import AlertLogic from "../logic/alert";

export default class ResetPassword extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { errors: [], email: "" };
  }

  propTypes = { location: ReactRouterPropTypes.location.isRequired  }

  onChange = e => { this.setState({ [e.target.name]: e.target.value }); }

  onSubmit = event => {
    event.preventDefault();
    let password_token = this.getPasswordToken();
    if(password_token == "")
      if(LoginLogic.isLoggedIn()) {
        AlertLogic.addError("You are already logged in!");
      } else {
        ResetPasswordLogic.sendResetPasswordInstructions(this.state)
          .then(() => AlertLogic.addSuccess("Reset password request submitted!"))
          .catch(errors => this.setState({errors}));
      }
    else
      ResetPasswordLogic.resetPassword(password_token, this.state)
        .then(() => AlertLogic.addSuccess("Password successfuly reset!"))
        .catch(errors => this.setState({errors}));
  }

  getPasswordToken = () => {
    let password_token = "";
    let search = this.props.location.search;
    if(search != "") {
      const params = new URLSearchParams(search);
      password_token = params.get("reset_password_token");
    }
    return password_token;
  }

  render() {
    let password_token = this.getPasswordToken();
    if(password_token != "")
      return <form name="form-password-reset"
        className="flex-vertical form-container"
        onSubmit={this.onSubmit}>
        <h2 className="form-signup-heading">Reset Password</h2>
        <TextInput name="password"
          type="password"
          error={this.state.errors.password}
          placeholder="Password"
          onChange={this.onChange} />
        <TextInput name="password_confirmation"
          type="password"
          error={this.state.errors.password_confirmation}
          placeholder="Confirm Password"
          onChange={this.onChange} />
        <br/>
        <button name="Submit"
          className="btn btn-lg btn-primary"
          type="submit">Submit</button>
      </form>;
    return (
      <form name="reset-password-form"
        className="flex-vertical form-container"
        onSubmit={this.onSubmit}>
        <h2 className="form-reset-password-heading">Reset password</h2>
        <div>Enter your account&apos;s email address and we will send you instructions to reset your password.</div>
        <TextInput name="email"
          type="text"
          error={this.state.errors.email}
          placeholder="Email address"
          onChange={this.onChange} autoFocus />
        <br/>
        <button name="Submit"
          id="submit"
          className="btn btn-lg btn-primary"
          type="submit">
          Send email
        </button>
        <br/>
      </form>
    );
  }
}
