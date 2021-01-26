import React, {fragement, Fragment} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/helper'


const currentTab = (history, path) => {
    // If you are in the home page then 'Home' in navbar will be highlighted with '#2ecc72' color
    if (history.location.pathname === path) {
        return {color: '#2ecc72'}
    } else {
        return {color: '#FFFFFF'}
    }
}

const Menu = ({history, path}) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">Cart</Link>
                </li>
                {/* { true && true }  - if aithenticated then show the dashboard link*/}
                { isAuthenticated() && (
                    <li className="nav-item">
                        <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">Dashboard</Link>
                    </li>
                )}
                { !isAuthenticated() && (
                    // Fragment allows you to send out 2 different divs instead of one big div
                    <Fragment>
                        <li className="nav-item">
                            <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">Signup</Link>
                        </li>
                        <li className="nav-item">
                            <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">Signin</Link>
                        </li>
                    </Fragment>
                )}
                { isAuthenticated() && (
                    <li className="nav-item">
                        {/* <Link style={currentTab(history, "/signout")} className="nav-link" to="/signout">Signout</Link> */}
                        <span
                        className="nav-link text-warning"
                        onClick={() => {
                            signout(() => {
                                // bring user back to the home page after signout
                                // we can use redirect also here
                                history.push("/")
                            })
                        }} 
                        >Signout</span>
                    </li>
                )}
            </ul>
        </div>
    )
}

// Allows you keep a history of users paths
export default withRouter(Menu)