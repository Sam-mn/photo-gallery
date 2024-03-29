import { useState } from "react";
import CreateAlbum from "./CreateAlbum";
import { Link } from "react-router-dom";
import { Row, Container, Col, Card, Form, Button } from "react-bootstrap";
import { db } from "../../firebase/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { FadeLoader } from "react-spinners";
import placeholder from "../../assets/images/placeholder.png";
import useGEtAlbums from "../hooks/useGetAlbums";
import useDeleteAlbum from "../hooks/useDeleteAlbum";

const Albums = () => {
    const [albumName, setAlbumName] = useState("");
    const [adding, setAdding] = useState(false);
    const { albums, loading } = useGEtAlbums();
    const { handleDeleteAlbum } = useDeleteAlbum();

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
                    Create a new album
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
                        <CreateAlbum uuid={uuidv4} setAdding={setAdding} />
                    </div>
                ) : (
                    ""
                )}

                {loading ? (
                    <div className='d-flex justify-content-center my-5'>
                        <FadeLoader color={"#fff"} size={100} />
                    </div>
                ) : (
                    <Row className='my-4 justify-content-sm-center'>
                        {albums.length > 0 ? (
                            albums.map((album, i) => (
                                <Col
                                    sm={12}
                                    md={6}
                                    lg={4}
                                    className='mt-4'
                                    key={i}
                                >
                                    <Card
                                        style={{
                                            maxWidth: "100%",
                                        }}
                                    >
                                        <Link
                                            to={`/album/${album.name}/${album.albumId}`}
                                        >
                                            <Card.Img
                                                variant='top'
                                                src={placeholder}
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
                                                    <Link
                                                        to={`/album/${album.name}/${album.albumId}`}
                                                        className='albumName'
                                                    >
                                                        {album.name}
                                                    </Link>
                                                )}
                                            </Card.Title>
                                        </Card.Body>
                                        <div
                                            className='editDiv'
                                            onClick={() => handleEdit(album.id)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </div>

                                        <div className='deleteAlbum'>
                                            <FontAwesomeIcon
                                                icon={faTimes}
                                                style={{
                                                    color: "black",
                                                    cursor: "pointer",
                                                    alignSelf: "center",
                                                }}
                                                onClick={() =>
                                                    handleDeleteAlbum(
                                                        album.id,
                                                        album.albumId
                                                    )
                                                }
                                            />
                                        </div>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p className='text-white'>
                                There is no albums to show.
                            </p>
                        )}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default Albums;
