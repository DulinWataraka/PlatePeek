import { useState } from "react";
import Homepage from "./Homepage.jsx";
import Login from "./Login.jsx";

function App() {
    const [page, setPage] = useState("home");

    if (page === "login") {
        return <Login onBackToHome={() => setPage("home")} />;
    }

    return <Homepage onLoginClick={() => setPage("login")} />;
}

export default App;
