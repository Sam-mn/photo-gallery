import { useEffect, useState } from "react";
import CreateAlbum from "./CreateAlbum";
import { Link } from "react-router-dom";
import { Row, Container, Col, Card, Form } from "react-bootstrap";
import { db } from "../../firebase/index";
import { useAuth } from "../../context/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [edit, setEdit] = useState(false);
    const [albumName, setAlbumName] = useState("");
    const { currentUser } = useAuth();

    useEffect(() => {
        const unsubscribe = db
            .collection("albums")
            .where("owner", "==", currentUser.uid)
            .onSnapshot((data) => {
                const allAlbums = [];
                data.forEach((album) => {
                    allAlbums.push({
                        id: album.id,
                        ...album.data(),
                    });
                });

                setAlbums(allAlbums);
            });

        return unsubscribe;
    }, []);

    const handleEdit = () => {
        setEdit(!edit);
    };

    const handleOnChange = (e) => {
        setAlbumName(e.target.value);
    };

    const handleOnSubmit = async (e, id) => {
        e.preventDefault();
        console.log("hello");
        if (!albumName) {
            return;
        }

        await db.collection("albums").doc(id).update({
            name: albumName,
        });
        setEdit(false);
    };

    return (
        <div>
            <CreateAlbum />
            <Container>
                <Row>
                    {albums.length > 0 ? (
                        albums.map((album, i) => (
                            <Col md={4} className='mt-4' key={i}>
                                <Card>
                                    <Link
                                        to={`/album/${album.name}/${album.albumId}`}
                                    >
                                        <Card.Img
                                            variant='top'
                                            src='https://via.placeholder.com/50'
                                        />
                                    </Link>
                                    <Card.Body>
                                        <Card.Title className='text-center'>
                                            {edit ? (
                                                <Form
                                                    onSubmit={(e) =>
                                                        handleOnSubmit(
                                                            e,
                                                            album.id
                                                        )
                                                    }
                                                >
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            placeholder='Normal text'
                                                            onChange={
                                                                handleOnChange
                                                            }
                                                        />
                                                    </Form.Group>
                                                </Form>
                                            ) : (
                                                album.name
                                            )}
                                        </Card.Title>
                                    </Card.Body>
                                    <div
                                        className='editDiv'
                                        onClick={handleEdit}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </div>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p className='text-white'>There is no album to show</p>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default Albums;
