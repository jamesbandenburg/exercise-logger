import React, { useState, useContext } from 'react'
import ActivitiesContext from '../context/ActivitiesContext'
import UsersContext from '../context/UsersContext'

const ActivitiesForm = () => {
   
    let currentDate = new Date(Date.now()).toDateString()

    const activitiesContext = useContext(ActivitiesContext)

    const { addActivity, showAddSuccess, showAddSuccessDialog } = activitiesContext

    const usersContext = useContext(UsersContext)

    const { currentUser } = usersContext

    const [activity, setActivity] = useState({
        user: currentUser[0]._id,
        type: 'Walking',
        date: currentDate,
        duration: '',
        location: ''
    })

    const { type, date, duration, location } = activity

    const onChange = (e) => {
        setActivity({...activity, [e.target.name]: e.target.value})
    }


    const onSubmit = (e) => {
        e.preventDefault()
        addActivity(activity)
        showAddSuccess(true)
        setActivity({
            user: currentUser[0]._id,
            type: 'Walking',
            date: currentDate,
            duration: '',
            location: ''
        })
    } 

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h1 style={{marginBottom: "20px"}}>Add new activity</h1>
                <p style={{opacity: `${showAddSuccessDialog ? 1 : 0}`, transition: "opacity 200ms"}}>Activity successfully added!</p>
                <div className="form-group">
                    <label htmlFor="type-selector">Type: </label>
                    <select className="form-control" name="type" id="type-selector" value={type} onChange={onChange}>
                        <option>Walking</option>
                        <option>Running</option>
                        <option>Cycling</option>
                        <option>Swimming</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="date-entry">Date: </label>
                    <input type="text" id="date-entry" className="form-control" name="date" value={date} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="duration-entry">Duration: </label>
                    <input type="text" id="duration-entry" name="duration" className="form-control" value={duration} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="location-entry">Location: </label>
                    <input type="text" id="location-entry" name="location" className="form-control" value={location} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" id="submit-new-activity" value="Add activity"></input>
                </div>
            </form>
        </div>
    )
    
}

export default ActivitiesForm
