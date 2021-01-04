import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

function App() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <div className='App'></div>
            </Routes>
        </Router>
    );
}

export default App;
