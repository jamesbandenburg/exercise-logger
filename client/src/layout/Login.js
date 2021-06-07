import React, { useContext, useState, useEffect } from 'react'
import UsersContext from '../context/UsersContext'

const Login = () => {

    const usersContext = useContext(UsersContext)

    const { users, showRegisterModal, showRegisterSuccessDialog, setCurrentUser, getUsers } = usersContext

    useEffect(() => {
      getUsers()
    }, [])

    const [loginDetails, setLoginDetails] = useState({
        loginEmail: '',
        loginPassword: ''
    })

    const { loginEmail, loginPassword } = loginDetails

    const onChange = (e) => {
        setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(users)
        const userToLogin = users.map((ele,index) =>  { if (ele.length > 0) { return ele[index].filter((elem) => elem.email === loginEmail)}  })
       
        if (userToLogin.length === 0) {
            alert("User not found. Please register if you don't have an account.")
        } else if (
            userToLogin[0].password !== loginPassword
        ) {
            alert("Incorrect password")
        } else {
            setCurrentUser(userToLogin)
        
        }
        
    }

    const openRegisterModal = () => {
        showRegisterModal(true)
    }

    if (showRegisterSuccessDialog === true) {
        getUsers()
    }


    return (
   
        <div style={{width: "60%", height: "300px"}} className="d-flex justify-content-center align-items-center">
            <form className="justify-content-center">
             <div className="form-group">
                <label htmlFor="loginEmail">Email:</label>
                <input type="text" name="loginEmail" id="loginEmail" className="form-control" value={loginEmail} onChange={onChange}></input>
             </div>
             <div className="form-group">
                 <label htmlFor="loginPassword">Password:</label>
                 <input type="password" name="loginPassword" id="loginPassword" className="form-control" value={loginPassword} onChange={onChange}></input>
             </div>
             <div className="form-group d-inline-flex">
             <button className="btn btn-primary form-control" onClick={onSubmit}>Log In</button> 
             <button type="button" className="btn btn-success form-control" style={{marginLeft: "10px"}} onClick={openRegisterModal}>Register</button>
            </div>
            <p style={{opacity: `${showRegisterSuccessDialog ? 1 : 0}`, transition: "opacity 400ms"}}>Registration successful! You can now log in.</p>
            </form>
            
        </div>
       
    
    )
}

export default Login
