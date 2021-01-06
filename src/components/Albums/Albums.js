import { useEffect, useState } from "react";
import CreateAlbum from "./CreateAlbum";
import { Link } from "react-router-dom";
import { Row, Container, Col, Card } from "react-bootstrap";
import { db } from "../../firebase/index";

const Albums = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection("albums").onSnapshot((data) => {
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
                                            {album.name}
                                        </Card.Title>
                                    </Card.Body>
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
