import { useState } from "react";
import { Card, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    return (
        <Row>
            {uploadedPhotos.map((photo, i) => (
                <div className='col-md-4' key={photo.id}>
                    <Card
                        key={i}
                        style={{
                            width: "19rem",
                            border: photo.like
                                ? "3px solid green"
                                : photo.dislike
                                ? "3px solid red"
                                : "",
                        }}
                    >
                        <SRLWrapper>
                            <Card.Img variant='top' src={photo.url} />
                        </SRLWrapper>
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
                        {photo.checked ? (
                            <div
                                className='checkDiv'
                                onClick={() => handleCheck(photo.id)}
                            >
                                <FontAwesomeIcon icon={faCheckSquare} />
                            </div>
                        ) : (
                            <div
                                className='checkDiv'
                                onClick={() => handleUncheck(photo.id)}
                            >
                                <FontAwesomeIcon icon={faSquare} />
                            </div>
                        )}
                        {/* <div className='reactionDiv'>
                            {photo.like ? (
                                <div className='likeIconDiv'>
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                </div>
                            ) : photo.dislike ? (
                                <div className='dislikeIconDiv'>
                                    <FontAwesomeIcon icon={faThumbsDown} />
                                </div>
                            ) : (
                                ""
                            )}
                        </div> */}
                    </Card>
                </div>
            ))}
        </Row>
    );
};

export default Photo;
