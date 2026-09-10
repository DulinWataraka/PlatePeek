import "./Profile.css";
import bannerImg from "./assets/foodbanner.jpg";
import plate1 from "./assets/pasta.png";
import plate2 from "./assets/pizza.png";
import plate3 from "./assets/sushi.png";
import { useState } from "react";

/* ---------- tiny inline icon set (kept consistent with Homepage's line-icon style) ---------- */

function HomeIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11.5 12 4l9 7.5" />
            <path d="M5.5 9.5V20h13V9.5" />
            <path d="M9.5 20v-6h5v6" />
        </svg>
    );
}

function ExploreIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M15.5 8.5 13 13l-4.5 2.5L11 11z" />
        </svg>
    );
}

function ChallengesIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 21h8" />
            <path d="M12 17v4" />
            <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
            <path d="M17 5h3a2 2 0 0 1-2 4" />
            <path d="M7 5H4a2 2 0 0 0 2 4" />
        </svg>
    );
}

function LeaderboardIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="5" />
            <path d="M8.5 12.5 7 21l5-2.5L17 21l-1.5-8.5" />
        </svg>
    );
}

function BellIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
            <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
    );
}

function ProfileIcon() {
    return (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
        </svg>
    );
}

function PencilIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
    );
}

function CameraIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8h3l2-2h6l2 2h3v11H4z" />
            <circle cx="12" cy="13.5" r="3.2" />
        </svg>
    );
}

function PinIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
        </svg>
    );
}

function GridIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
            <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
            <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
            <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
        </svg>
    );
}

function BookmarkIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3h12v18l-6-4-6 4Z" />
        </svg>
    );
}

function TagIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.5 3H5v7.5L14.5 20 21 13.5Z" />
            <circle cx="8.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
        </svg>
    );
}

/* ---------- decorative doodles (line-art, purely visual) ---------- */

function WheatDoodle({ className }) {
    return (
        <svg className={`doodle ${className || ""}`} width="46" height="90" viewBox="0 0 46 90" fill="none" stroke="#D8B888" strokeWidth="1.6" strokeLinecap="round">
            <path d="M23 6v78" />
            <path d="M23 16c-7-3-10-9-9-15" /><path d="M23 16c7-3 10-9 9-15" />
            <path d="M23 32c-7-3-10-9-9-15" /><path d="M23 32c7-3 10-9 9-15" />
            <path d="M23 48c-7-3-10-9-9-15" /><path d="M23 48c7-3 10-9 9-15" />
            <path d="M23 64c-7-3-10-9-9-15" /><path d="M23 64c7-3 10-9 9-15" />
        </svg>
    );
}

function TomatoDoodle({ className }) {
    return (
        <svg className={`doodle ${className || ""}`} width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="#D8B888" strokeWidth="1.6" strokeLinecap="round">
            <path d="M30 14c11 0 19 8 19 19s-8 19-19 19-19-8-19-19 8-19 19-19Z" />
            <path d="M30 14c-1-5 1-8 4-10" />
            <path d="M30 14c1-4-1-7-5-9" />
            <path d="M22 26c3-2 13-2 16 0" />
        </svg>
    );
}

function SpoonDoodle({ className }) {
    return (
        <svg className={`doodle ${className || ""}`} width="40" height="90" viewBox="0 0 40 90" fill="none" stroke="#D8B888" strokeWidth="1.6" strokeLinecap="round">
            <ellipse cx="20" cy="16" rx="11" ry="14" />
            <path d="M20 30v54" />
        </svg>
    );
}

/* ---------- sidebar ---------- */

function Sidebar({ onBackToHome, onLogout }) {
    const navItems = [
        { key: "home", label: "Home", icon: <HomeIcon />, onClick: onBackToHome },
        { key: "explore", label: "Explore", icon: <ExploreIcon /> },
        { key: "challenges", label: "Challenges", icon: <ChallengesIcon /> },
        { key: "leaderboard", label: "Leaderboard", icon: <LeaderboardIcon /> },
        { key: "notifications", label: "Notifications", icon: <BellIcon /> },
        { key: "profile", label: "Profile", icon: <ProfileIcon /> },
    ];

    return (
        <aside className="pp-sidebar">
            <div className="pp-sidebar-logo" onClick={onBackToHome}>
                <span className="pp-logo-icon">🍴</span>
                <span>plate peek</span>
            </div>

            <nav className="pp-nav">
                {navItems.map((item) => (
                    <button
                        key={item.key}
                        type="button"
                        className={`pp-nav-item ${item.key === "profile" ? "pp-nav-item-active" : ""}`}
                        onClick={item.onClick}
                    >
                        <span className="pp-nav-icon">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>

            <button type="button" className="pp-logout" onClick={onLogout}>
                Log out
            </button>
        </aside>
    );
}

/* ---------- main profile page ---------- */

function Profile({ account, onBackToHome, onLogout }) {
    const [activeTab, setActiveTab] = useState("plates");

    const isHost = account?.role === "host";
    const displayName = account?.fullName || account?.ownerName || "New Foodie";
    const username = account?.username || (account?.shopName ? account.shopName.toLowerCase().replace(/\s+/g, "") : "newfoodie");
    const initial = displayName.trim().charAt(0).toUpperCase() || "N";

    return (
        <div className="pp-app">
            <Sidebar onBackToHome={onBackToHome} onLogout={onLogout} />

            <main className="pp-main">
                <div className="pp-card">
                    <WheatDoodle className="doodle-top-right" />
                    <TomatoDoodle className="doodle-left" />
                    <SpoonDoodle className="doodle-right" />

                    <div className="pp-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
                        <div className="pp-banner-overlay">
                            <p className="pp-banner-script">
                                Good food<br />better moods
                            </p>
                        </div>
                    </div>

                    <div className="pp-identity">
                        <div className="pp-avatar-wrap">
                            <div className="pp-avatar">{initial}</div>

                        </div>

                        <div className="pp-name-row">
                            <h1 className="pp-name">{displayName}</h1>
                            <span className="pp-role-pill">🍴 {isHost ? "Host" : "Guest"}</span>
                        </div>
                        <p className="pp-username">@{username}</p>

                        <button type="button" className="pp-edit-btn">
                            <PencilIcon /> Edit profile
                        </button>

                        <div className="pp-stats">
                            <div className="pp-stat">
                                <strong>6</strong>
                                <span>Plates</span>
                            </div>
                            <div className="pp-stat">
                                <strong>128</strong>
                                <span>Followers</span>
                            </div>
                            <div className="pp-stat">
                                <strong>94</strong>
                                <span>Following</span>
                            </div>
                        </div>

                        <p className="pp-meta">
                            <PinIcon /> Colombo, Sri Lanka <span className="pp-dot">·</span> Member since 2025
                        </p>

                        <p className="pp-bio">
                            Still deciding on my food personality. Ask me about the last thing I ate.
                        </p>

                        <div className="pp-level-card">
                            <div className="pp-level-top">
                                <span className="pp-level-title">Lvl 18 • Food Explorer</span>
                                <span className="pp-streak-pill">🔥 12 day streak</span>
                            </div>
                            <div className="pp-progress-track">
                                <div className="pp-progress-fill" style={{ width: "84%" }} />
                            </div>
                            <div className="pp-level-bottom">
                                <span>8,450 XP</span>
                                <span>10,000 XP</span>
                            </div>
                        </div>

                        <div className="pp-badges">
                            <span className="pp-badge">🔥 7 day streak</span>
                            <span className="pp-badge">🍜 Ramen regular</span>
                            <span className="pp-badge">🌶️ Spice explorer</span>
                        </div>

                        <div className="pp-tabs">
                            <button
                                type="button"
                                className={`pp-tab ${activeTab === "plates" ? "pp-tab-active" : ""}`}
                                onClick={() => setActiveTab("plates")}
                            >
                                <GridIcon /> My plates
                            </button>
                            <button
                                type="button"
                                className={`pp-tab ${activeTab === "saved" ? "pp-tab-active" : ""}`}
                                onClick={() => setActiveTab("saved")}
                            >
                                <BookmarkIcon /> Saved
                            </button>
                            <button
                                type="button"
                                className={`pp-tab ${activeTab === "tagged" ? "pp-tab-active" : ""}`}
                                onClick={() => setActiveTab("tagged")}
                            >
                                <TagIcon /> Tagged
                            </button>
                        </div>
                    </div>

                    <div className="pp-plates-grid">
                        <img src={plate1} alt="Plate shared by New Foodie" />
                        <img src={plate2} alt="Plate shared by New Foodie" />
                        <img src={plate3} alt="Plate shared by New Foodie" />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Profile;
