import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import AuthContextProvider from "./context/useAuth";
import Albums from "./components/Albums/Albums";
import Album from "./components/Albums/Album";
import AuthRoute from "./components/AuthRoute";

function App() {
    return (
        <Router>
            <AuthContextProvider>
                <Navigation />
                <Routes>
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
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </AuthContextProvider>
        </Router>
    );
}

export default App;
