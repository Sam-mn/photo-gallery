import { useState } from "react";
import AddPhoto from "./AddPhoto";
import { Container } from "react-bootstrap";
import Photos from "./Photos";
import { useAuth } from "../../context/useAuth";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Album = () => {
    const [adding, setAdding] = useState(false);
    const { currentUser } = useAuth();

    const handleOnClick = () => {
        setAdding(true);
    };

    return (
        <Container>
            {currentUser && (
                <Button
                    variant='outline-primary'
                    onClick={handleOnClick}
                    style={{ marginTop: "1rem" }}
                >
                    Add new photos
                </Button>
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
