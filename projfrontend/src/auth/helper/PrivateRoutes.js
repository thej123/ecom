import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from '.'


// Make sure all the important routes are blocked if authentication is not done
const PrivateRoutes = ({children, ...rest}) =>{
    return (
        <Route
            {...rest}
            render={(props) =>
            // terinary operation - if authenticated, go to the children routes, if not go to login page
            isAuthenticated ? (
                // children
                <Component {...props} />
            ) : (
                <Redirect
                to={{
                    pathname: "/signin",
                    state: { from: props.location }
                }}
                />
            )
            }
        />
    )
}

export default PrivateRoutes