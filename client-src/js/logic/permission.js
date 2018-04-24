import React from 'react'
import { render } from 'react-dom'
import { Route, Redirect } from 'react-router-dom'

import LoginLogic from './../logic/login.js'
import { UserContext } from './../context/user-context.js'

export function RequireLoggedInRoute ({
                  component: Component,
                  ...props
                }) {
  return (
    <Route render={(ctx) => LoginLogic.isLoggedIn()
        ? <Component {...props}/>
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export function RenderIfLoggedOut(props) {
  return <UserContext.Consumer>
    { v => (v.username === "") && props.children }
  </UserContext.Consumer>
}

export function RenderIfLoggedIn(props) {
  return <UserContext.Consumer>
    { v => (v.username !== "") && props.children }
  </UserContext.Consumer>
}

export function RenderIfRole({role, ...props}) {
  return <UserContext.Consumer>
    { v => (v.role === role) && props.children }
  </UserContext.Consumer>
}
