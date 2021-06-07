import React, { useContext, Fragment } from 'react'

import ActivitiesContext from '../context/ActivitiesContext'

const ActivityItem = ({ activity }) => {

    const activitiesContext = useContext(ActivitiesContext)
    const { deleteActivity, editActivity, showDeleteSuccess, isFiltered, filteredType } = activitiesContext


    const { _id, type, date, location, duration } = activity

    const onDelete = () => {
        deleteActivity(_id)
        showDeleteSuccess(true)

    }

    const onEdit = () => {
       
        editActivity(true, _id)
    }
    return (
        <Fragment>
            {isFiltered === true && type === filteredType ?
            <div className="container" style={{padding: "10px", margin: "10px", border: "5px solid seagreen", borderRadius: "5px", textAlign: "left"}}>
                <div className="row">
                    <div className="col-sm-10">
                        <p>Type: <strong>{type}</strong></p>
                        <p>Date: <strong>{new Date(date).toDateString()}</strong></p>
                        <p>Duration: <strong>{duration}</strong></p>
                        <p>Location: <strong>{location}</strong></p>
                    </div>
                    <div className="col-sm-2 d-flex justify-content-end align-items-end">
                    <button className="btn btn-primary" style={{marginRight: "10px"}} onClick={onEdit}>Edit</button>
                    <button className="btn btn-danger" onClick={onDelete}>Delete</button>
                    </div>
                </div>
            </div>
            : isFiltered === false ?  
            <div className="container" style={{padding: "10px", margin: "10px", border: "5px solid seagreen", borderRadius: "5px", textAlign: "left"}}>
                <div className="row">
                    <div className="col-sm-10">
                        <p>Type: <strong>{type}</strong></p>
                        <p>Date: <strong>{new Date(date).toDateString()}</strong></p>
                        <p>Duration: <strong>{duration}</strong></p>
                        <p>Location: <strong>{location}</strong></p>
                    </div>
                    <div className="col-sm-2 d-flex justify-content-end align-items-end">
                    <button className="btn btn-primary" style={{marginRight: "10px"}} onClick={onEdit}>Edit</button>
                    <button className="btn btn-danger" onClick={onDelete}>Delete</button>
                    </div>
                </div>
            </div> :
            <div>
                
            </div>}
        </Fragment>
           
    )
}

export default ActivityItem
