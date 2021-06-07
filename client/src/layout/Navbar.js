import React, { Fragment, useContext } from 'react'
import UsersContext from '../context/UsersContext'
import AboutModal from './AboutModal'

const Navbar = () => {

        const usersContext = useContext(UsersContext)

        const { loggedIn, showAbout, clearCurrentUser, currentUser } = usersContext

        
        const onLogout = () => {
            clearCurrentUser()

        }

        const onAbout = () => {
            showAbout(true)
        }


        return (
            <Fragment>
                <nav className="navbar navbar-nav navbar-light navbar-expand-lg d-flex justify-content-between">
                    <span className="navbar-brand" style={{marginLeft: "20px", color: "antiquewhite", fontWeight: "bold"}}>Exercise Logger</span>
                    {loggedIn && <h5 style={{color: "antiquewhite"}}>Welcome, {currentUser[0].name}!</h5>}
                    <div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {loggedIn && <button className="btn btn-primary" onClick={onLogout} style={{color: "antiquewhite"}}>Logout</button>}
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-primary" href="#" onClick={onAbout} style={{color: "antiquewhite"}}>About</button>
                            </li>
                        </ul>
                    </div>
                 </nav>
                 <AboutModal />
            </Fragment>
        )
    
}

export default Navbar
