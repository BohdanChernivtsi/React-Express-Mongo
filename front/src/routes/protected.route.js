import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {isAuthenticated} from '../App'

export default function ProtectedRoute ({component: Component, ...rest}) {
    return (
        <Route {...rest} render={
            props => {
                if (isAuthenticated) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{
                        pathname: '/login',
                        state: {
                            from: props.location
                        }
                    }}/>
                }
            }
        }/>
    )
}