import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import PrivateRoutes from './auth/helper/PrivateRoutes'
import Home from './core/Home'
import Signup from './user/Signup'
import UserDashboard from './user/UserDashboard'

// ES 6 syntax - same as the 'export default function Routes...'
const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoutes path="/user/dashboard" exact component={UserDashboard}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes