import React, { Fragment, useContext, useState } from 'react'
import ActivitiesContext from '../context/ActivitiesContext'
import Modal from 'react-bootstrap/Modal'

const EditActivity = () => {

    const activitiesContext = useContext(ActivitiesContext)

    const { showEditModal, closeEditWindow, activityToEdit, putActivity, showEditSuccess, setLoading } = activitiesContext

    

    let [activity, setActivity] = useState({
        type: '',
        date: '',
        location: '',
        duration: ''
    })

    const fillForm = () => {
        setActivity({
            _id: activityToEdit._id,
            type: activityToEdit.type,
            date: new Date(activityToEdit.date).toDateString(),
            location: activityToEdit.location,
            duration: activityToEdit.duration
        });
        setLoading(false)
    }

    let { type, date, location, duration } = activity

    const onEdit = (e) => {
        setActivity({...activity, [e.target.name]: e.target.value})
    }   

    const onSubmit = (e) => {

        e.preventDefault();
        putActivity(activity);
        showEditSuccess(true)
        closeEditWindow(true)

    }

    return (
        <Fragment>
             <Modal show={showEditModal} onHide={closeEditWindow} onShow={fillForm}>
                 
                <Modal.Header>
                  <Modal.Title>Edit Activity</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={onSubmit}>
                        <div className="form-group">
                    <label htmlFor="type-selector">Type: </label>
                    <select className="form-control" name="type" id="type" value={type} onChange={onEdit}>
                        <option>Walking</option>
                        <option>Running</option>
                        <option>Cycling</option>
                        <option>Swimming</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="date-entry">Date: </label>
                    <input type="text" id="date-entry" className="form-control" name="date" value={date} onChange={onEdit}/>
                </div>
                <div className="form-group">
                    <label htmlFor="duration-entry">Duration: </label>
                    <input type="text" id="duration-entry" name="duration" className="form-control" value={duration} onChange={onEdit}/>
                </div>
                <div className="form-group">
                    <label htmlFor="location-entry">Location: </label>
                    <input type="text" id="location-entry" name="location" className="form-control" value={location} onChange={onEdit}/>
                </div>
                <input type="submit" className="btn btn-primary" style={{marginRight: "20px"}} value="Save Changes"/>
                <button className="btn btn-secondary" onClick={closeEditWindow}>Cancel</button>

                        </form>
                    </Modal.Body>
                
                   
                
            </Modal>
        </Fragment>
    )
}

export default EditActivity