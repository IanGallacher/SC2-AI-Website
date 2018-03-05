import React from 'react'
import { render } from 'react-dom'

export default class Logout extends React.PureComponent {
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
