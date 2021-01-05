import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import AuthContextProvider from "./context/useAuth";

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
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </AuthContextProvider>
        </Router>
    );
}

export default App;
