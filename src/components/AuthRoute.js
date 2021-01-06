import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const AuthRoute = (props) => {
    const { currentUser } = useAuth();
    return currentUser ? <Route {...props} /> : <Navigate to='/login' />;
};

export default AuthRoute;
