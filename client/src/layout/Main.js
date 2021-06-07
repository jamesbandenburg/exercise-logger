import React, { useContext } from 'react'
import ActivitiesForm from './ActivitiesForm'
import Activities from './Activities'
import EditActivity from './EditActivity'

import Login from './Login'
import UsersContext from '../context/UsersContext'
import Register from './Register'

const Main = () => {

    const usersContext = useContext(UsersContext)

    const { loggedIn } = usersContext

    return (
        <div className="container" style={{marginTop: "30px"}}>
          
        {loggedIn ? 
    
          <div className="row">
            <div className="col-sm-4">
              <ActivitiesForm />
            </div>
            <div className="col-sm-8">
              <Activities />
              <EditActivity />
            </div>
          </div>
            : 
            <div className="container d-flex justify-content-center">
              <Login />
              <Register /> 
            </div>
          }
        </div>
    )
}

export default Main
