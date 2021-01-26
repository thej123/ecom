import React from 'react'
import Menu from './Menu'

const Base = ({
    //  some defaults for the input we get when some calls the Base component
    title = "My Title",
    description = "My Description",
    className = "bg-dark text-white p-4",
    children
}) => {
    return (
        <div>
            <Menu></Menu>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fuild bg-successs text-white text-center py-3">
                    <h4>If you got any questions, I am not here to help!!</h4>
                    <button className="btn btn-warning btn-lg">Contact Us</button>
                    <div className="container">
                        <span className="text-warning">
                            An Amazing Django-React Fullstack Project
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Base