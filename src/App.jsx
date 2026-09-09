import { useState } from "react";
import Homepage from "./Homepage.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Profile from "./Profile.jsx";

function App() {
    const [page, setPage] = useState("home");
    const [account, setAccount] = useState(null); // { role: "guest" | "host", ...formData }

    function goToProfile(role, data) {
        setAccount({ role, ...data });
        setPage("profile");
    }

    if (page === "login") {
        return (
            <Login
                onBackToHome={() => setPage("home")}
                onRegisterClick={() => setPage("register")}
                onLoginSuccess={goToProfile}
            />
        );
    }

    if (page === "register") {
        return (
            <Register
                onBackToHome={() => setPage("home")}
                onLoginClick={() => setPage("login")}
                onRegisterSuccess={goToProfile}
            />
        );
    }

    if (page === "profile" && account) {
        return (
            <Profile
                account={account}
                onBackToHome={() => setPage("home")}
                onLogout={() => {
                    setAccount(null);
                    setPage("home");
                }}
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