import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/index";
import { Card, Button, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const Photos = () => {
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const unsubscribe = db
            .collection("images")
            .where("albumId", "==", id)
            .onSnapshot((snapshot) => {
                const imgs = [];

                snapshot.forEach((doc) => {
                    imgs.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });

                setUploadedPhotos(imgs);
            });

        return unsubscribe;
    }, [id]);

    const handleLike = (id) => {
        db.collection("images").doc(id).update({ like: true, dislike: false });
    };

    const handleDislike = (id) => {
        db.collection("images").doc(id).update({ like: false, dislike: true });
    };
    return (
        <div className='mt-3'>
            <Row>
                {uploadedPhotos.map((photo, i) => (
                    <Card className='col-md-4' key={i}>
                        <Card.Img variant='top' src={photo.url} />
                        <Card.Body>
                            <Card.Title>{photo.name}</Card.Title>
                            <Button
                                variant='primary'
                                onClick={() => handleLike(photo.id)}
                            >
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </Button>
                            <Button
                                variant='primary'
                                onClick={() => handleDislike(photo.id)}
                            >
                                <FontAwesomeIcon icon={faThumbsDown} />
                            </Button>
                        </Card.Body>
                        <div className='reactionDiv'>
                            {photo.like ? (
                                <div className='likeIconDiv'>
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                </div>
                            ) : photo.dislike ? (
                                <div className='likeIconDiv'>
                                    <FontAwesomeIcon icon={faThumbsDown} />
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </Card>
                ))}
            </Row>
            ;
        </div>
    );
};

export default Photos;
