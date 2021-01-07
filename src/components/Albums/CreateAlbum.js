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

const CreateAlbum = ({ uuid }) => {
    const AlbumNameRef = useRef();
    const { currentUser } = useAuth();

    const handleOnSubmit = (e) => {
        e.preventDefault();

        db.collection("albums").add({
            name: AlbumNameRef.current.value,
            owner: currentUser.uid,
            albumId: uuid(),
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
