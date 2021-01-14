import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import imageviewerbrand from "../assets/images/imageviewerbrand.png";

const Navigation = () => {
    const { signOut, currentUser } = useAuth();

    const handleLogout = async () => {
        try {
            signOut();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Navbar bg='light' expand='lg' className='py-0 px-3'>
            <NavLink to='/' className='navbar-brand'>
                <img
                    alt=''
                    src={imageviewerbrand}
                    width='30'
                    height='30'
                    className='d-inline-block align-top'
                />
                Photo gallery
            </NavLink>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto'>
                    {currentUser ? (
                        <>
                            <NavLink to='/profile' className='nav-link'>
                                {currentUser.displayName
                                    ? currentUser.displayName
                                    : currentUser.email}
                            </NavLink>
                            <NavLink to='/albums' className='nav-link'>
                                My albums
                            </NavLink>
                            <NavLink
                                to='/logout'
                                className='nav-link'
                                onClick={handleLogout}
                            >
                                Log Out
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to='/login' className='nav-link'>
                                Login
                            </NavLink>
                            <NavLink to='/signup' className='nav-link'>
                                Signup
                            </NavLink>{" "}
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
