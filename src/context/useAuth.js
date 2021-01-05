import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/index";

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
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
        });

        return unSubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ signup, signIn, currentUser, signOut }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthContext, useAuth, AuthContextProvider as default };
