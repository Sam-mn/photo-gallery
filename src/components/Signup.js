import React, { useRef } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== confirmRef.current.value) {
            console.log("The passwords dose not match");
            return;
        }

        try {
            await signup(emailRef.current.value, passwordRef.current.value);
            console.log("we have a new user, yaaaaaay");
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Row className='mt-5'>
            <Col md={{ span: 6, offset: 3 }}>
                <Card>
                    <Card.Body>
                        <Card.Title>Sign Up</Card.Title>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    ref={emailRef}
                                    required
                                />
                            </Form.Group>

                            <Form.Group id='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    ref={passwordRef}
                                    required
                                />
                            </Form.Group>

                            <Form.Group id='password-confirm'>
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control
                                    type='password'
                                    ref={confirmRef}
                                    required
                                />
                            </Form.Group>

                            <Button type='submit'>Create Account</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='text-center mt-2 text-white'>
                    Already have an account? <Link to='/login'>Log In</Link>
                </div>
            </Col>
        </Row>
    );
};

export default Signup;
