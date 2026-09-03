import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage.jsx";
import LoginPage from "./LoginPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;