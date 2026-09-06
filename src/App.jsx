import { useState } from "react";
import Homepage from "./Homepage.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

function App() {
    const [page, setPage] = useState("home");

    if (page === "login") {
        return (
            <Login
                onBackToHome={() => setPage("home")}
                onRegisterClick={() => setPage("register")}
            />
        );
    }

    if (page === "register") {
        return (
            <Register
                onBackToHome={() => setPage("home")}
                onLoginClick={() => setPage("login")}
            />
        );
    }

    return (
        <Homepage
            onLoginClick={() => setPage("login")}
            onRegisterClick={() => setPage("register")}
        />
    );
}

export default App;
