import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/index";
import { FadeLoader } from "react-spinners";

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    const signIn = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    const signOut = () => {
        return auth.signOut();
    };

    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unSubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ signup, signIn, currentUser, signOut }}>
            {loading ? (
                <div className='d-flex justify-content-center my-5'>
                    <FadeLoader color={"#fff"} size={100} />
                </div>
            ) : (
                props.children
            )}
        </AuthContext.Provider>
    );
};

export { AuthContext, useAuth, AuthContextProvider as default };
