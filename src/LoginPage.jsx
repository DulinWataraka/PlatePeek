import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Wire this up to your real auth flow, then:
        navigate("/");
    };

    return (
        <div className="auth-page">
            <div className="auth-panel auth-panel--brand">
                <div className="brand-mark">
                    <span className="brand-mark__icon">🍴</span>
                    <span className="brand-mark__dot"></span>
                    <span className="brand-mark__name">plate peek</span>
                </div>

                <div className="brand-content">
                    <span className="brand-eyebrow">built for regulars</span>

                    <h1 className="brand-headline">
                        Save your
                        <br />
                        <span className="brand-headline--accent">seat.</span>
                    </h1>

                    <p className="brand-subtext">
                        One place for every table you've booked, every dish you've
                        loved, and the friends you keep meaning to invite back.
                    </p>
                </div>

                <div className="brand-footer">plate peek / 2025</div>
            </div>

            <div className="auth-panel auth-panel--form">
                <div className="form-wrap">
                    <span className="form-eyebrow">welcome back</span>

                    <h2 className="form-headline">
                        Good to see
                        <br />
                        you again.
                    </h2>

                    <p className="form-subtext">
                        Your table is probably closer than you think.
                    </p>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="field">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <div className="field__control">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="field__toggle"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>

                        <a href="#forgot" className="forgot-link">
                            Forgot password?
                        </a>

                        <button type="submit" className="submit-btn">
                            Log me in <span>→</span>
                        </button>
                    </form>

                    <p className="signup-line">
                        New around here? <a href="#signup">Create an account</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;