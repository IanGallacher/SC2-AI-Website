import React from 'react'
import { render } from 'react-dom'
import { Route, Redirect } from 'react-router-dom'

export function PrivateRoute (
                  {component: Component,
                   users_allowed: AllowedUsers }) {
  return (
    <Route
      render={(props) => localStorage.getItem("user_id") != ""
        ? <Component />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}