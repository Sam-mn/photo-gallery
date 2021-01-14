import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();
    const [err, setErr] = useState(false);
    const [msg, setMsg] = useState("");
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== confirmRef.current.value) {
            setMsg("Passwords does not match, please try again.");
            setErr(true);
            return;
        }

        try {
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/");
            setErr(false);
        } catch (err) {
            setErr(true);
            setMsg(err.message);
            console.log(err.message);
        }
        setMsg("Password should be at least 6 characters");
    };

    return (
        <Row className='mt-5' style={{ maxWidth: "100%", margin: 0 }}>
            <Col md={{ span: 6, offset: 3 }}>
                <Card className='cardShadow'>
                    <Card.Body>
                        <Card.Title>Sign Up</Card.Title>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    aria-label='email'
                                    ref={emailRef}
                                    required
                                />
                            </Form.Group>

                            <Form.Group id='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    ref={passwordRef}
                                    aria-label='password'
                                    required
                                />
                            </Form.Group>

                            <Form.Group id='password-confirm'>
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control
                                    type='password'
                                    ref={confirmRef}
                                    aria-label='Password Confirmation'
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
                {err && (
                    <Alert variant='warning' className='mt-2'>
                        {msg}
                    </Alert>
                )}
            </Col>
        </Row>
    );
};

export default Signup;
