import React from 'react'
import { render } from 'react-dom'
import { Route, Redirect } from 'react-router-dom'

import LoginLogic from './../logic/login.js'

export function RequireLoggedInRoute ({
                  component: Component,
                  ...props 
                }) {
  return (
    <Route
      render={(ctx) => LoginLogic.isLoggedIn()
        ? <Component {...props}/>
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
