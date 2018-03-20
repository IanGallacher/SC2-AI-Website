import React from 'react'
import { render } from 'react-dom'
import { Route, Redirect } from 'react-router-dom'

import LoginLogic from './../logic/login.js'

export function RequireLoggedInRoute (
                  {component: Component,
                   users_allowed: AllowedUsers }) {
  return (
    <Route
      render={(props) => LoginLogic.isLoggedIn()
        ? <Component />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
