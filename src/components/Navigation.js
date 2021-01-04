import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <Navbar bg='light' expand='lg' className='py-0 px-5'>
            <Navbar.Brand href='#home'>Photo gallery</Navbar.Brand>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto'>
                    <NavLink to='/login' className='nav-link'>
                        Login
                    </NavLink>
                    <NavLink to='#link' className='nav-link'>
                        Link
                    </NavLink>
                    <NavLink to='/signup' className='nav-link'>
                        Signup
                    </NavLink>
                    <NavDropdown title='user' id='basic-nav-dropdown'>
                        <NavDropdown.Item href='#action/3.1'>
                            Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item href='#action/3.2'>
                            Log out
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
