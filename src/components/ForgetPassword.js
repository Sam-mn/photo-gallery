import { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { auth } from "../firebase/index";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const emailRef = useRef();
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        auth.sendPasswordResetEmail(emailRef.current.value)
            .then((data) => {
                navigate("/login");
                setError(false);
            })
            .catch((err) => {
                setError(true);
                setMsg(err.message);
            });
    };
    return (
        <div>
            <Row className='mt-5'>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Forgot password</Card.Title>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id='email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type='email'
                                        ref={emailRef}
                                        required
                                    />
                                </Form.Group>

                                <Button type='submit'>Reset password</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    {error && (
                        <Alert className='text-center mt-2 ' variant='warning'>
                            {msg}
                        </Alert>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ForgetPassword;
