import { useEffect, useState } from "react";
import CreateAlbum from "./CreateAlbum";
import { Link } from "react-router-dom";
import { Row, Container, Col, Card } from "react-bootstrap";
import { db } from "../../firebase/index";

const Albums = () => {
    const [albums, setAlbums] = useState(null);

    useEffect(() => {
        const unsubscribe = db.collection("Albums").onSnapshot((data) => {
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

    return (
        <div>
            <CreateAlbum />
            <Container>
                <Row>
                    {albums ? (
                        albums.map((album) => (
                            <Col md={4} className='mt-4'>
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
                                            {album.name}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>There is no album to show</p>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default Albums;
