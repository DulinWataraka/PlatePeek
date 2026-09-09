import { useState } from "react";
import "./Register.css";

const SHOP_CATEGORIES = [
    "Restaurant",
    "Cafe",
    "Bakery",
    "Street Food",
    "Fine Dining",
    "Fast Food",
    "Dessert Shop",
    "Bar",
    "Other",
];

function Register({ onBackToHome, onLoginClick, onRegisterSuccess }) {
    const [role, setRole] = useState("guest");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isGuest = role === "guest";

    function handleGuestSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        onRegisterSuccess("guest", {
            fullName: data.get("fullName") || "New Foodie",
            username: data.get("username") || "newfoodie",
            email: data.get("email") || "",
        });
    }

    function handleHostSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        onRegisterSuccess("host", {
            ownerName: data.get("ownerName") || "New Owner",
            email: data.get("ownerEmail") || "",
            shopName: data.get("shopName") || "My Shop",
            shopCategory: data.get("shopCategory") || "Restaurant",
            shopAddress: data.get("shopAddress") || "",
        });
    }

    return (
        <div className="register-page">
            <aside className="register-side">
                <div className="register-logo" onClick={onBackToHome}>
                    <span className="register-logo-icon">🍴</span>
                    <span>plate peek</span>
                </div>

                <div className="register-side-content">
                    <span className="badge">MADE FOR CURIOUS EATERS</span>

                    <h1>
                        Your table
                        <br />
                        has a <span>story.</span>
                    </h1>

                    <p>
                        A better way to remember the dishes, people,
                        and places that make a meal matter.
                    </p>
                </div>

                <div className="register-side-footer">PLATE PEEK / 2025</div>
            </aside>

            <main className="register-form-side">
                <div className="register-form-wrap">
                    <span className="register-eyebrow">START HERE</span>

                    <h2>Bring your appetite.</h2>

                    <p className="subtext">
                        Make an account and start building your personal map of good food.
                    </p>

                    <div className="role-select">
                        <span className="role-select-label">I'm joining as</span>

                        <div className="role-cards">
                            <button
                                type="button"
                                className={`role-card ${isGuest ? "role-card-active" : ""}`}
                                onClick={() => setRole("guest")}
                            >
                                {isGuest && (
                                    <span className="role-check">✓</span>
                                )}
                                <span className="role-icon">🍴</span>
                                <span className="role-title">Guest</span>
                                <span className="role-desc">
                                    Discover places, save dishes, leave reviews.
                                </span>
                            </button>

                            <button
                                type="button"
                                className={`role-card ${!isGuest ? "role-card-active" : ""}`}
                                onClick={() => setRole("host")}
                            >
                                {!isGuest && (
                                    <span className="role-check">✓</span>
                                )}
                                <span className="role-icon">🧑‍🍳</span>
                                <span className="role-title">Host</span>
                                <span className="role-desc">
                                    List your shop and connect with diners.
                                </span>
                            </button>
                        </div>

                        <p className="role-hint">
                            You're setting up a {isGuest ? "guest" : "host"} account.
                        </p>
                    </div>

                    {isGuest ? (
                        <form className="register-form" onSubmit={handleGuestSubmit}>
                            <label htmlFor="fullName">Full name</label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Mina Park"
                            />

                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="minapark"
                            />

                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                            />

                            <label htmlFor="password">Create a password</label>
                            <div className="password-field">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="At least 6 characters"
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

                            <label htmlFor="confirmPassword">Confirm password</label>
                            <div className="password-field">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Re-enter your password"
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowConfirmPassword((v) => !v)}
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? "🙉" : "🙈"}
                                </button>
                            </div>

                            <button type="submit" className="register-submit">
                                Take my seat <span>→</span>
                            </button>
                        </form>
                    ) : (
                        <form className="register-form" onSubmit={handleHostSubmit}>
                            <label htmlFor="ownerName">Owner full name</label>
                            <input
                                id="ownerName"
                                name="ownerName"
                                type="text"
                                placeholder="Mina Park"
                            />

                            <label htmlFor="ownerEmail">Email address</label>
                            <input
                                id="ownerEmail"
                                name="ownerEmail"
                                type="email"
                                placeholder="you@example.com"
                            />

                            <label htmlFor="ownerPassword">Create a password</label>
                            <div className="password-field">
                                <input
                                    id="ownerPassword"
                                    name="ownerPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="At least 6 characters"
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

                            <label htmlFor="ownerConfirmPassword">Confirm password</label>
                            <div className="password-field">
                                <input
                                    id="ownerConfirmPassword"
                                    name="ownerConfirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Re-enter your password"
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowConfirmPassword((v) => !v)}
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? "🙉" : "🙈"}
                                </button>
                            </div>

                            <label htmlFor="shopName">Shop name</label>
                            <input
                                id="shopName"
                                name="shopName"
                                type="text"
                                placeholder="Mina's Kitchen"
                            />

                            <label htmlFor="shopCategory">Shop category</label>
                            <select id="shopCategory" name="shopCategory" defaultValue="">
                                <option value="" disabled>
                                    Select a category
                                </option>
                                {SHOP_CATEGORIES.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="shopAddress">Shop address</label>
                            <input
                                id="shopAddress"
                                name="shopAddress"
                                type="text"
                                placeholder="123 Galle Road, Colombo"
                            />

                            <button type="submit" className="register-submit">
                                Open my shop <span>→</span>
                            </button>
                        </form>
                    )}

                    <p className="signup-link">
                        Already have a place here? <a href="#login" onClick={(e) => { e.preventDefault(); onLoginClick(); }}>Log in</a>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Register;