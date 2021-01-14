import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";

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
                Photo gallery
            </NavLink>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto'>
                    {currentUser ? (
                        <>
                            <NavLink to='/albums' className='nav-link'>
                                My albums
                            </NavLink>
                            <NavDropdown
                                title={
                                    currentUser.displayName
                                        ? currentUser.displayName
                                        : currentUser.email
                                }
                                id='basic-nav-dropdown'
                            >
                                <NavDropdown.Item href='/profile'>
                                    Profile
                                </NavDropdown.Item>
                                <NavLink
                                    to='/logout'
                                    className='dropdown-item'
                                    onClick={handleLogout}
                                >
                                    Log Out
                                </NavLink>
                            </NavDropdown>
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
