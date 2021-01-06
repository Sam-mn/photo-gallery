import AddPhoto from "./AddPhoto";
import { Container } from "react-bootstrap";
import Photos from "./Photos";
const Album = () => {
    return (
        <Container>
            <AddPhoto />
            <Photos />
        </Container>
    );
};

export default Album;
