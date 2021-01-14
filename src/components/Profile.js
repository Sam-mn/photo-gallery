import React, { useRef } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { useAuth } from "../context/useAuth";

const Profile = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const { currentUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        currentUser.updateProfile({
            displayName: nameRef.current.value,
            email: emailRef.current.value,
        });
    };

    return (
        <Row className='mt-5' style={{ maxWidth: "100%", margin: 0 }}>
            <Col md={{ span: 6, offset: 3 }}>
                <Card>
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
            </Col>
        </Row>
    );
};

export default Profile;
