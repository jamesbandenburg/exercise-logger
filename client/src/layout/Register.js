import React, { Fragment, useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import UsersContext from '../context/UsersContext'

const Register = () => {

    const usersContext = useContext(UsersContext)

    const { showRegisterModal, postUser, showRegister, users } = usersContext

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const { name, email, password, passwordConfirm } = user

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userEmailCompare = users.filter(registeredUser => registeredUser.email === user.email)
        if (password !== passwordConfirm) {
            alert("Error - your passwords must match!")
        } 
        else if (   
            userEmailCompare.length !== 0
        )
        {
            alert("A user with that email address already exists. Please login or register with a different email address.")
        }
        else {
            postUser(user)
            setUser({
                name: '',
                email: '',
                password: '',
                passwordConfirm: '',
            })
           
        }
    }

    const closeRegisterModal = () => {
        showRegisterModal(false)
    }

    return (
        <Fragment>
        
            <Modal show={showRegister} onHide={closeRegisterModal}>
                <Modal.Header>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please fill out all fields</p>
                        <form onSubmit={onSubmit}>
                        <div className="form-group">
                    <label htmlFor="name-entry">Name: </label>
                    <input type="text" id="name-entry" name="name" className="form-control" value={name} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email-entry">Email: </label>
                    <input type="email" id="email-entry" className="form-control" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password-entry">Password (minimum 6 characters): </label>
                    <input type="password" minlength="6" id="password-entry" name="password" className="form-control" value={password} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password-confirm">Confirm Password: </label>
                    <input type="password" minlength="6" id="password-confirm" name="passwordConfirm" className="form-control" value={passwordConfirm} onChange={onChange} required/>
                </div>
                <input type="submit" className="btn btn-primary" value="Sign Up" style={{marginRight: "20px"}}/>
                <button className="btn btn-secondary" onClick={closeRegisterModal}>Cancel</button>

                    </form>
                    </Modal.Body>
                
                    
            


            </Modal>
        </Fragment>
    )
}

export default Register
