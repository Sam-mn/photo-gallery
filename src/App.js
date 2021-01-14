import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import AuthContextProvider from "./context/useAuth";
import Albums from "./components/Albums/Albums";
import Album from "./components/Albums/Album";
import AuthRoute from "./components/AuthRoute";
import SimpleReactLightbox from "simple-react-lightbox";
import Home from "./components/Home";
import Logout from "./components/Logout";
import ForgetPassword from "./components/ForgetPassword";
import Profile from "./components/Profile";

function App() {
    return (
        <AuthContextProvider>
            <SimpleReactLightbox>
                <Navigation />
                <Routes>
                    <Route path='/'>
                        <Home />
                    </Route>
                    <Route path='/profile'>
                        <Profile />
                    </Route>
                    <Route path='/signup'>
                        <Signup />
                    </Route>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <AuthRoute path='/albums'>
                        <Albums />
                    </AuthRoute>
                    <Route path='/album/:name/:id'>
                        <Album />
                    </Route>
                    <Route path='/logout'>
                        <Logout />
                    </Route>
                    <Route path='/reset'>
                        <ForgetPassword />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </SimpleReactLightbox>
        </AuthContextProvider>
    );
}

export default App;
