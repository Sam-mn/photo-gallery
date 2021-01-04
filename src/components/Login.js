import { useRef } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(emailRef.current.value);
    };
    return (
        <Row className='mt-5'>
            <Col md={{ span: 6, offset: 3 }}>
                <Card>
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
            </Col>
        </Row>
    );
};

export default Login;
