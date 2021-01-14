import { Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../context/useAuth";
import {
    faThumbsUp,
    faThumbsDown,
    faSquare,
    faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import { SRLWrapper } from "simple-react-lightbox";

const Photo = ({
    uploadedPhotos,
    handleLike,
    handleDislike,
    handleCheck,
    handleUncheck,
}) => {
    const { currentUser } = useAuth();
    return (
        <Row className='my-4 justify-content-sm-center'>
            {uploadedPhotos.length > 0 ? (
                uploadedPhotos.map((photo, i) => (
                    <Col sm={12} md={6} lg={4} className='mt-4' key={photo.id}>
                        <Card
                            style={{
                                maxWidth: "100%",
                                border: photo.like
                                    ? "5px solid green"
                                    : photo.dislike
                                    ? "5px solid red"
                                    : "",
                            }}
                        >
                            <SRLWrapper>
                                <div className='imgContainer'>
                                    <a href={photo.url} data-attribute='SRL'>
                                        <Card.Img
                                            variant='top'
                                            src={photo.url}
                                            alt={photo.name}
                                        />
                                    </a>
                                    <div className='overlay'>{photo.name}</div>
                                </div>
                            </SRLWrapper>
                            {currentUser ? (
                                ""
                            ) : (
                                <Card.Body>
                                    <div className='d-flex justify-content-around'>
                                        <div
                                            className='dislikeButton'
                                            variant='primary'
                                            onClick={() =>
                                                handleDislike(photo.id)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faThumbsDown}
                                            />
                                        </div>
                                        <div
                                            className='likeButton'
                                            variant='primary'
                                            onClick={() => handleLike(photo.id)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faThumbsUp}
                                            />
                                        </div>
                                    </div>
                                </Card.Body>
                            )}
                            {currentUser &&
                                (photo.checked ? (
                                    <div
                                        className='checkDiv'
                                        onClick={() => handleCheck(photo.id)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCheckSquare}
                                            style={{
                                                color: "#fff",
                                                cursor: "pointer",
                                                border: "1px solid #000",
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className='checkDiv'
                                        onClick={() => handleUncheck(photo.id)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faSquare}
                                            style={{
                                                color: "#fff",
                                                cursor: "pointer",
                                                border: "1px solid #000",
                                            }}
                                        />
                                    </div>
                                ))}
                        </Card>
                    </Col>
                ))
            ) : (
                <p className='text-white'>There is no Photos to show.</p>
            )}
        </Row>
    );
};

export default Photo;
