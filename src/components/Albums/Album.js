import { useState } from "react";
import AddPhoto from "./AddPhoto";
import { Container } from "react-bootstrap";
import Photos from "./Photos";
import { useAuth } from "../../context/useAuth";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Album = () => {
    const [adding, setAdding] = useState(false);
    const [copied, setCopied] = useState(false);
    const { currentUser } = useAuth();

    const handleOnClick = () => {
        setAdding(true);
    };

    return (
        <Container>
            {currentUser && (
                <div className='photoFirstDiv'>
                    <Button variant='outline-primary' onClick={handleOnClick}>
                        Add new photos
                    </Button>
                    <div>
                        <CopyToClipboard
                            text={window.location.href}
                            onCopy={() => setCopied(true)}
                        >
                            <Button variant='outline-info'>
                                Copy album url
                            </Button>
                        </CopyToClipboard>
                        {copied ? (
                            <span
                                style={{ color: "green", marginLeft: "0.5rem" }}
                            >
                                Copied.
                            </span>
                        ) : null}
                    </div>
                </div>
            )}

            {currentUser && adding ? (
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
                    <AddPhoto setAdding={setAdding} />
                </div>
            ) : (
                ""
            )}

            <Photos />
        </Container>
    );
};

export default Album;
