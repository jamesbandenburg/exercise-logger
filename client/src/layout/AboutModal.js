import React, { useContext, Fragment } from 'react'
import Modal from 'react-bootstrap/Modal'
import UsersContext from '../context/UsersContext'

const AboutModal = () => {

    const usersContext = useContext(UsersContext)

    const { showAbout, showAboutModal } = usersContext

    const closeAboutModal = () => {
        showAbout(false)
    }

    return (
        <Fragment>
            <Modal show={showAboutModal} onHide={closeAboutModal}>
                <Modal.Header>
                    <Modal.Title style={{textAlign: "center"}}>
                        About Exercise Logger
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                          A full-stack MERN app to keep track of your daily exercise. For the born-again lockdown fitness freak in us all.
                         <br /> 
                         <br />
                         For sample login use email address 'johndoe@gmail.com' and password '123456'.
                         <br />
                         <br />
                         Version 1.0.0 
                    
                </Modal.Body>
                <Modal.Footer>
                   
                    <button className="btn btn-primary" onClick={closeAboutModal}>Close</button>
                 
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default AboutModal
