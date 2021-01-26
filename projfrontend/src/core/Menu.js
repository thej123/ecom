import React from 'react'
import { Link, withRouter } from 'react-router-dom'

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
                    <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">Signin</Link>
                </li>
            </ul>
        </div>
    )
}

// Allows you keep a history of users paths
export default withRouter(Menu)