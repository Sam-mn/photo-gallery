import AddPhoto from "./AddPhoto";
import { Container } from "react-bootstrap";
import Photos from "./Photos";
import { useAuth } from "../../context/useAuth";

const Album = () => {
    const { currentUser } = useAuth();
    return (
        <Container>
            {currentUser ? <AddPhoto /> : ""}
            <Photos />
        </Container>
    );
};

export default Album;
