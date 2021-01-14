import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/useAuth";

const Profile = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const { currentUser } = useAuth();
    const [msg, setMsg] = useState("");
    const [updated, setUpdated] = useState(false);
    const [err, setErr] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            currentUser.updateProfile({
                displayName: nameRef.current.value,
                email: emailRef.current.value,
            });
            setUpdated(true);
            setMsg("Name is updated");
        } catch (err) {
            setErr(true);
            setMsg(err.message);
        }
    };

    return (
        <Row className='mt-5' style={{ maxWidth: "100%", margin: 0 }}>
            <Col md={{ span: 6, offset: 3 }}>
                <Card className='cardShadow'>
                    <Card.Body>
                        <Card.Title>Profile</Card.Title>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group id='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    ref={nameRef}
                                    defaultValue={
                                        currentUser.displayName
                                            ? currentUser.displayName
                                            : ""
                                    }
                                />
                            </Form.Group>
                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    ref={emailRef}
                                    defaultValue={currentUser.email}
                                />
                            </Form.Group>

                            <Button type='submit'>Update</Button>
                        </Form>
                    </Card.Body>
                </Card>
                {err && (
                    <Alert variant='warning' className='mt-2'>
                        {msg}
                    </Alert>
                )}
                {updated && (
                    <Alert variant='success' className='mt-2'>
                        {msg}
                    </Alert>
                )}
            </Col>
        </Row>
    );
};

export default Profile;
