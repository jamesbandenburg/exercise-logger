import React, { useReducer } from 'react'
import { LOGIN, POST_USER, SHOW_REGISTER, SHOW_REGISTER_SUCCESS, SHOW_ABOUT, SET_CURRENT_USER, GET_USERS } from './Types'
import usersReducer from './UsersReducer'
import UsersContext from './UsersContext'
import axios from 'axios'

const UsersState = (props) => {

    const initialState = {
        users: [
             {
                _id: "1",
                name: "John Doe",
                email: "johndoe@gmail.com",
                password: "123456"
            },
            {
                _id: "2",
                name: "Bob Log",
                email: "boblog@gmail.com",
                password: "123456"
            }
        ],
        loggedIn: false,
        showRegister: false,
        showRegisterSuccessDialog: false,
        showAboutModal: false,
        currentUser: ''
        
    };

        const loginSuccess = (login) => {
            dispatch({
                type: LOGIN,
                payload: login
            })
        }


    // Get Users

        const getUsers = async () => {
            try {
                const res = await axios.get('/api/users');
             dispatch({
                 type: GET_USERS,
                 payload: res.data
             })
            } catch (error) {
                console.log(error.message)
            }
             
        }

    // Set Current User
    
        const setCurrentUser = (user) => {
           
            dispatch({
                type: SET_CURRENT_USER,
                payload: user
            })
        }

    // Clear Current User

        const clearCurrentUser = () => {
            dispatch({
                type: SET_CURRENT_USER,
                payload: [{
                    _id: '',
                    name: '',
                    email: '',
                    password: ''
                }]
            })
            dispatch({
                type: LOGIN,
                payload: false
            })
        }

    // Post User

        const postUser = async (user) => {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        try {
            const res = await axios.post("/api/users", user, config)
            dispatch({
            type: POST_USER,
            payload: res.data
        })
        setTimeout(() => {
            dispatch({
                type: SHOW_REGISTER_SUCCESS,
                payload: false
            })
        }, 2000)
        } catch (error) {
            console.log(error.message)
        }
        
        }

    



    // Show Registration

        const showRegisterModal = (show) => {
            dispatch({
                type: SHOW_REGISTER,
                payload: show
            })
        }

    // Show Registration Success
  
        const showRegisterSuccess = (showReg) => {
            dispatch({
                type: SHOW_REGISTER_SUCCESS,
                payload: showReg
            })

        }

    // Show About Modal

        const showAbout = (show) => {
            dispatch({
                type: SHOW_ABOUT,
                payload: show
            })
        }
   
     const [state, dispatch] = useReducer(usersReducer, initialState)

    return (
        
            <UsersContext.Provider value={{
                loggedIn: state.loggedIn,
                users: state.users,
                showRegister: state.showRegister,
                showRegisterSuccessDialog: state.showRegisterSuccessDialog,
                showAboutModal: state.showAboutModal,
                currentUser: state.currentUser,
                showRegisterSuccess,
                loginSuccess,
                postUser,
                showRegisterModal,
                showAbout,
                setCurrentUser,
                clearCurrentUser,
                getUsers
                
            }}>
                { props.children }
            </UsersContext.Provider>
        
    )
}

export default UsersState
