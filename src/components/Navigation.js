import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const Navigation = () => {
    return (
        <Navbar bg='light' expand='lg' className='py-0 pr-5'>
            <Navbar.Brand href='#home'>Photo gallery</Navbar.Brand>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto'>
                    <Nav.Link href='#home'>Home</Nav.Link>
                    <Nav.Link href='#link'>Link</Nav.Link>
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
