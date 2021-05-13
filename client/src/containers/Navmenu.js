import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import { GiHummingbird} from "react-icons/gi";
import Button from 'react-bootstrap/Button'
import {logout} from '../store/actions/auth'

const Navmenu = ({currentUser, logout}) => {

    
    return (
        <>
         <Navbar expand='lg' bg='dark' variant='dark' className='shadow px-4'>
            <Navbar.Brand>
                <Link to='/'>
                    <GiHummingbird className='fs-2 text-light mr-5'/>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>

                {currentUser.isAuthenticated ? (

                    <Nav className="mr-auto justify-content-end w-100">
                        <Nav.Link 
                            className='font-weight-bolder  navButton' 
                            to= {`/users/${currentUser.user.id}/messages/new`}
                            as={Link}
                        >
                                New Message
                        </Nav.Link>
                        <Button variant='danger' className='font-weight-bolder text-white' onClick={logout} >
                            Logout
                        </Button>

                    </Nav>


                ) :   
                (
                    <Nav className="mr-auto justify-content-end w-100">

                        <Nav.Link className='font-weight-bolder  navButton' to='/signup' as={Link}>
                            Sign Up
                        </Nav.Link>
                        <Nav.Link className='font-weight-bolder  navButton' to='/signin' as={Link}>
                            Sign In
                        </Nav.Link>
                    </Nav>

                )
                
                }
                
               
            </Navbar.Collapse>
        </Navbar>
        
        </>
    
       
       
    )
}

const mapStateToProps = (state) => (
    {
        currentUser:state.userReducer
    }
)

export default connect(mapStateToProps, {logout})(Navmenu);
