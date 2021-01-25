import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import PrivateRoutes from './auth/helper/PrivateRoutes'
import Home from './core/Home'



// ES 6 syntax - same as the 'export default function Routes...'
const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                {/* <PrivateRoutes path="/user/dashboard" exact component={}/> */}
            </Switch>
        </BrowserRouter>
    )
}

export default Routes