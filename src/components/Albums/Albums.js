import { useEffect, useState } from "react";
import CreateAlbum from "./CreateAlbum";
import { Link } from "react-router-dom";
import { Row, Container, Col, Card, Form, Button } from "react-bootstrap";
import { db } from "../../firebase/index";
import { useAuth } from "../../context/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [albumName, setAlbumName] = useState("");
    const { currentUser } = useAuth();
    const [adding, setAdding] = useState(false);

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
    }, [currentUser.uid]);

    const handleEdit = (id) => {
        db.collection("albums").doc(id).update({
            editing: true,
        });
    };

    const handleOnChange = (e) => {
        setAlbumName(e.target.value);
    };

    const handleOnSubmit = async (e, id) => {
        e.preventDefault();
        if (!albumName) {
            return;
        }

        await db.collection("albums").doc(id).update({
            name: albumName,
        });

        db.collection("albums").doc(id).update({
            editing: false,
        });

        setAdding(false);
    };

    const handleOnClick = () => {
        setAdding(true);
    };

    return (
        <div>
            <Container>
                <Button
                    variant='outline-primary'
                    onClick={handleOnClick}
                    style={{ marginTop: "1rem" }}
                >
                    Create anew album
                </Button>
                {adding ? (
                    <div className='addPhotoDiv'>
                        <FontAwesomeIcon
                            icon={faTimes}
                            style={{
                                color: "white",
                                marginLeft: "0.5rem",
                                cursor: "pointer",
                            }}
                            onClick={() => setAdding(false)}
                        />
                        <CreateAlbum uuid={uuidv4} />
                    </div>
                ) : (
                    ""
                )}

                <Row>
                    {albums.length > 0 ? (
                        albums.map((album, i) => (
                            <Col md={4} className='mt-4' key={i}>
                                <Card
                                    style={{
                                        width: "19rem",
                                    }}
                                >
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
                                            {album.editing ? (
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
                                                            placeholder='Album name'
                                                            onChange={
                                                                handleOnChange
                                                            }
                                                            defaultValue={
                                                                album.name
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
                                        onClick={() => handleEdit(album.id)}
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
