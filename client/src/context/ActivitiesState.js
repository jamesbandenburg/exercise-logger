import { GET_ACTIVITIES, POST_ACTIVITY, PUT_ACTIVITY, DELETE_ACTIVITY, EDIT_ACTIVITY, GET_ONE_ACTIVITY, SHOW_ADD_SUCCESS, SHOW_EDIT_SUCCESS, SET_LOADING, SHOW_DELETE_SUCCESS, APPLY_FILTER, CLEAR_FILTER, SHOW_DIALOG } from './Types'
import ActivitiesContext from './ActivitiesContext'
import activitiesReducer from './ActivitiesReducer'
import React, {useReducer} from 'react'
import axios from 'axios'

const ActivitiesState = (props) => {

    const initialState = {
        activities: [
          
        ],
        showEditModal: false,
        showAddSuccessDialog: false,
        showEditSuccessDialog: false,
        showDeleteSuccessDialog: false,
        showDialogText: false,
        loading: false,
        isFiltered: false,
        filteredType: '',
        activityToEdit: {

        }
    }

    // Set Loading

    const setLoading = async (operator) => {
        dispatch({
            type: SET_LOADING,
            payload: operator
        })
    }

    // GET activities

    const getActivities = async (currentUser) => {
        const config = {
            crossdomain: true,
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                user: `${currentUser[0]._id}`,
              }
            
          
        }
        try {
            const res = await axios.get('/api/activities', config)
       dispatch({
            type: GET_ACTIVITIES,
            payload: res.data
       })
        } catch (error) {
            console.log(error)
        }
       
       
    }

    // GET single activity

    const getOneActivity = async (id) => {
        const config = {
            crossdomain: true,
            headers: {
                "Content-Type": "application/json"
            },
            
        }
        try {
            const res = await axios.get(`/api/activities/${id}`, config)
    
                dispatch({
                            type: GET_ONE_ACTIVITY,
                            payload: res.data._id
                        });
        } catch (error) {
            console.log(error.message)
        }
        
    }



    // POST activity

    const addActivity = async (activity) => {
        
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        }
        try {
            const res = await axios.post('/api/activities', activity, config)
        dispatch({
            type: POST_ACTIVITY,
            payload: res.data
        })
        } catch (error) {
            console.log(error)
        }
        
    }


     // Show add success

     const showAddSuccess = (showAdd) => {
        dispatch({
            type: SHOW_ADD_SUCCESS,
            payload: showAdd
        })
        if (showAdd === true) {
            setTimeout(() => {
                dispatch({
                    type: SHOW_ADD_SUCCESS,
                    payload: false
                })
            }, 2000)
        }
    }


    // Open edit modal

    const editActivity = async (showModal, id) => {
        const config = {
            crossdomain: true,
            headers: {
                "Content-Type": "application/json"
            },
            
        }
        try {
            const res = await axios.get(`/api/activities/${id}`, config)
    
            console.log(res.data)
                dispatch({
                            type: GET_ONE_ACTIVITY,
                            payload: res.data._id
                        });

                showModal = true;
        dispatch({
            type: EDIT_ACTIVITY,
            payload: showModal
        })      
        } catch (error) {
            console.log(error.message)
        }
        
       
    }

    const closeEditWindow = (showModal) => {
        showModal = false;

        dispatch({
            type: EDIT_ACTIVITY,
            payload: showModal
        })
    }

    // PUT activity

    const putActivity = async (activity) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        }

        const res = await axios.put(`/api/activities/${activity._id}`, activity, config)

        dispatch({
            type: PUT_ACTIVITY,
            payload: res.data
        })
        console.log(activity)
    }

    // Show edit success

    const showEditSuccess = (showEdit) => {
        dispatch({
            type: SHOW_EDIT_SUCCESS,
            payload: showEdit
        })
        dispatch({
            type: SHOW_DIALOG,
            payload: showEdit
        })
        if (showEdit === true) {
            setTimeout(() => {
                dispatch({
                    type: SHOW_EDIT_SUCCESS,
                    payload: false
                })
            }, 2500)
            setTimeout(() => {
                dispatch({
                    type: SHOW_DIALOG,
                    payload: false
                })
            }, 2000)
        }
    }

    // DELETE activity

    const deleteActivity = async (id) => {
        const config = {
            headers: {
                "Type": "Application/json"
            }
        }
        const res = await axios.delete(`/api/activities/${id}`, config)
        if (res) {
        dispatch({
            type: DELETE_ACTIVITY,
            payload: id
        })
        dispatch({
            type: SHOW_DELETE_SUCCESS,
            payload: true
        })
    }}

    const showDeleteSuccess = (showDelete) => {
        dispatch({
            type: SHOW_DELETE_SUCCESS,
            payload: showDelete
        })
        dispatch({
            type: SHOW_DIALOG,
            payload: showDelete
        })
        if (showDelete === true) {
            setTimeout(() => {
                dispatch({
                    type: SHOW_DELETE_SUCCESS,
                    payload: false
                })
            }, 5000)
            setTimeout(() => {
                dispatch({
                    type: SHOW_DIALOG,
                    payload: false
                })
            }, 2000)
        }
        
    }

    // Apply Filter

    const applyFilter = (type) => {
        dispatch({
            type: APPLY_FILTER,
            payload: type
        })
    }

    // Clear Filter

    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER,
            payload: false
        })
    }

    const [state, dispatch] = useReducer(activitiesReducer, initialState)

    return (
        <ActivitiesContext.Provider value={{
            activities: state.activities,
            showEditModal: state.showEditModal,
            activityToEdit: state.activityToEdit,
            showAddSuccessDialog: state.showAddSuccessDialog,
            showEditSuccessDialog: state.showEditSuccessDialog,
            showDeleteSuccessDialog: state.showDeleteSuccessDialog,
            showDialogText: state.showDialogText,
            isFiltered: state.isFiltered,
            loading: state.loading,
            filteredType: state.filteredType,
            getActivities,
            getOneActivity,
            addActivity,
            putActivity,
            deleteActivity,
            editActivity,
            closeEditWindow,
            showAddSuccess,
            showEditSuccess,
            showDeleteSuccess,
            setLoading,
            applyFilter,
            clearFilter
            
        }}>
           { props.children }
        </ActivitiesContext.Provider>
    )
}

export default ActivitiesState
