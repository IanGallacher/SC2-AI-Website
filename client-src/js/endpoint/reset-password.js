import React from "react";
import {TextInput} from "../component/form";
import LoginLogic from "../logic/login";
import ResetPasswordLogic from "../logic/reset-password";
import AlertLogic from "../logic/alert";

export default class ResetPassword extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { email: "" };
  }

  onChange = e => { this.setState({ [e.target.name]: e.target.value }); }

  onSubmit = event => {
    event.preventDefault();
    if(LoginLogic.isLoggedIn()) {
      AlertLogic.addError("You are already logged in!");
    } else {
      ResetPasswordLogic.sendResetPasswordInstructions(this.state).then(() => {
        AlertLogic.addSuccess("Instructions have been sent!");
      });
    }
  }

  render() {
    return (
      <form name="reset-password-form"
        className="flex-vertical form-container"
        onSubmit={this.onSubmit}>
        <h2 className="form-signin-heading">Reset password</h2>
        <div>Enter your account&apos;s email address and we will send you instructions to reset your password.</div>
        <TextInput name="email"
          type="text"
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
