import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'

// This handles the private routing for a user based on if they are logged in or not.

export default function PrivateRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        <UserContext.Consumer>
          {userContext =>
            !!userContext.user.id
              ? <Component {...componentProps} />
              : (
                <Redirect
                  to={{
                    pathname: userContext.user.idle ? '/index' : '/index',
                    state: { from: componentProps.location },
                  }}
                />
              )
          }
        </UserContext.Consumer>
      )}
    />
  )
}
