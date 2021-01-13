import { Card, Row } from "react-bootstrap";
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
        <Row>
            {uploadedPhotos.map((photo, i) => (
                <div className='col-md-4 my-3' key={photo.id}>
                    <Card
                        key={i}
                        style={{
                            maxWidth: "19rem",
                            border: photo.like
                                ? "5px solid green"
                                : photo.dislike
                                ? "5px solid red"
                                : "",
                        }}
                    >
                        <SRLWrapper>
                            <a href={photo.url} data-attribute='SRL'>
                                <Card.Img
                                    variant='top'
                                    src={photo.url}
                                    alt={photo.name}
                                />
                            </a>
                        </SRLWrapper>
                        {currentUser ? (
                            ""
                        ) : (
                            <Card.Body>
                                <div className='d-flex justify-content-around'>
                                    <div
                                        className='dislikeButton'
                                        variant='primary'
                                        onClick={() => handleDislike(photo.id)}
                                    >
                                        <FontAwesomeIcon icon={faThumbsDown} />
                                    </div>
                                    <div
                                        className='likeButton'
                                        variant='primary'
                                        onClick={() => handleLike(photo.id)}
                                    >
                                        <FontAwesomeIcon icon={faThumbsUp} />
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
                </div>
            ))}
        </Row>
    );
};

export default Photo;
