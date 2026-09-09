import { useState } from "react";
import "./Login.css";

function Login({ onBackToHome, onRegisterClick, onLoginSuccess }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="login-page">
            <aside className="login-side">
                <div className="login-logo" onClick={onBackToHome}>
                    <span className="login-logo-icon">🍴</span>
                    <span>plate peek</span>
                </div>

                <div className="login-side-content">
                    <span className="badge">MADE FOR CURIOUS EATERS</span>

                    <h1>
                        Pull up
                        <br />
                        a <span>seat.</span>
                    </h1>

                    <p>
                        A better way to remember the dishes, people,
                        and places that make a meal matter.
                    </p>
                </div>

                <div className="login-side-footer">PLATE PEEK / 2025</div>
            </aside>

            <main className="login-form-side">
                <div className="login-form-wrap">
                    <span className="login-eyebrow">WELCOME BACK</span>

                    <h2>Good to see you again.</h2>

                    <p className="subtext">
                        Your next saved dish is probably closer than you think.
                    </p>

                    <form
                        className="login-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            onLoginSuccess("guest", {
                                fullName: "wdwd",
                                username: "Dulin",
                            });
                        }}
                    >
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                        />

                        <label htmlFor="password">Password</label>
                        <div className="password-field">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Your password"
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "🙉" : "🙈"}
                            </button>
                        </div>

                        <a className="forgot-link" href="#forgot">
                            Forgot password?
                        </a>

                        <button type="submit" className="login-submit">
                            Log me in <span>→</span>
                        </button>
                    </form>

                    <p className="signup-link">
                        New around here? <a href="#signup" onClick={(e) => { e.preventDefault(); onRegisterClick(); }}>Create an account</a>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Login;