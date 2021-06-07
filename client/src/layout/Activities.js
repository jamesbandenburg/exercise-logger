import React, { Fragment, useContext, useEffect, useState } from 'react'
import ActivitiesContext from '../context/ActivitiesContext'
import UsersContext from '../context/UsersContext'
import ActivityItem from './ActivityItem'
import EditActivity from './EditActivity'


const Activities = () => {
    const activitiesContext = useContext(ActivitiesContext)
    const usersContext = useContext(UsersContext)

    const { getActivities, showEditSuccessDialog, showDeleteSuccessDialog, activities, applyFilter, clearFilter, isFiltered, showDialogText } = activitiesContext

    const { currentUser, loggedIn } = usersContext
    
    useEffect(() => {
        if (loggedIn === true) {
        getActivities(currentUser)
        }

    }, [])

    const [filter, setFilter] = useState({
        type: 'Walking'
    })

    const { type } = filter

    const onChange = (e) => {
        setFilter({ type: e.target.value })
    }

    const applyFilterClick = (e) => {
        e.preventDefault()
        applyFilter(type)
    }

    const clearFilterClick = (e) => {
        e.preventDefault()
        clearFilter()
    }


    return (
        <Fragment>

            <h1 style={{marginBottom: "20px"}}>Activities</h1>
            <p style={{opacity: `${showDialogText ? 1 : 0}`, transition: "opacity 400ms"}}>Activity successfully {showEditSuccessDialog ? "edited" : showDeleteSuccessDialog ? "deleted" : " "}</p>
            

            <form className="form-group" onSubmit={applyFilterClick}>
            <div className="form-group row">
                    <label htmlFor="type-selector" className="col-sm-3 form-label">Filter by type: </label>
                    <select className="form-control col-sm-3" name="type" id="type-selector" value={type} onChange={onChange}>
                        <option>Walking</option>
                        <option>Running</option>
                        <option>Cycling</option>
                        <option>Swimming</option>
                        <option>Other</option>
                    </select>
                    {isFiltered === false &&
                    <button type="submit" className="btn btn-primary" style={{marginLeft: "20px"}}>Apply</button>
                    }
                    {isFiltered &&
                    <button className="btn btn-primary" style={{marginLeft: "20px"}} onClick={clearFilterClick}>Clear Filter</button>}
                </div>
            </form>


            {activities.length === 0  && <p>Nothing to show, add some activities to get started!</p>}
                                    
                {activities.map(activity => (
              
                   <ActivityItem activity={activity} />
              
                ))}
            
             <EditActivity />
        </Fragment>
    )
}

export default Activities
