import React, { useRef } from "react";
import {
    InputGroup,
    FormControl,
    Button,
    Container,
    Form,
} from "react-bootstrap";
import { useAuth } from "../../context/useAuth";
import { db } from "../../firebase/index";
import { v4 as uuidv4 } from "uuid";

const CreateAlbum = () => {
    const AlbumNameRef = useRef();
    const { currentUser } = useAuth();

    const handleOnSubmit = (e) => {
        e.preventDefault();

        db.collection("Albums").add({
            name: AlbumNameRef.current.value,
            owner: currentUser.uid,
            AlbumId: uuidv4(),
        });
    };

    return (
        <Container>
            <Form onSubmit={handleOnSubmit}>
                <InputGroup className='my-5'>
                    <FormControl
                        placeholder='Chose an album name'
                        aria-label='album name'
                        aria-describedby='basic-addon2'
                        ref={AlbumNameRef}
                        required
                    />
                    <InputGroup.Append>
                        <Button variant='outline-primary' type='submit'>
                            Create
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
        </Container>
    );
};

export default CreateAlbum;
