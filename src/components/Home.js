import { useAuth } from "../context/useAuth";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    return (
        <Container>
            {currentUser && (
                <p className='text-white my-4'>
                    Welcome{" "}
                    {currentUser.displayName
                        ? currentUser.displayName
                        : currentUser.uid}
                </p>
            )}
            <div className='homeDiv'>
                <h1>WELCOME TO OUR WEBSITE</h1>
                <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old.
                </p>
                {currentUser ? (
                    <Button
                        variant='outline-primary'
                        onClick={() => navigate("/albums")}
                    >
                        Go to Albums
                    </Button>
                ) : (
                    <Button
                        variant='outline-primary'
                        onClick={() => navigate("/login")}
                    >
                        LogIn
                    </Button>
                )}
            </div>
        </Container>
    );
};

export default Home;
