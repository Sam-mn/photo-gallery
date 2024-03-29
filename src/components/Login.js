import { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");
    const { signIn, currentUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn(emailRef.current.value, passwordRef.current.value);
            setError(false);
            navigate("/");
        } catch (err) {
            setError(true);
            setMsg(err.message);
        }
    };

    return (
        <Row className='mt-5' style={{ maxWidth: "100%", margin: 0 }}>
            <Col md={{ span: 6, offset: 3 }}>
                <Card className='cardShadow'>
                    <Card.Body>
                        <Card.Title>Sign In</Card.Title>

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

                            <Button type='submit'>Sign in</Button>
                        </Form>
                        <p>
                            <Link to='/reset'>Forget password</Link>
                        </p>
                    </Card.Body>
                </Card>
                <div className='text-center mt-2 text-white'>
                    Need an account? <Link to='/signup'>Sign Up</Link>
                </div>
                {error && (
                    <Alert className='text-center mt-2 ' variant='warning'>
                        {msg}
                    </Alert>
                )}
            </Col>
        </Row>
    );
};

export default Login;
