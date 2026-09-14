import "./Profile.css";
import bannerImg from "./assets/foodbanner.jpg";
import plate1 from "./assets/pasta.png";
import plate2 from "./assets/pizza.png";
import plate3 from "./assets/sushi.png";
import { useRef, useState } from "react";

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

function Profile({ account, onBackToHome, onLogout, onAccountUpdate }) {
    const [activeTab, setActiveTab] = useState("plates");
    const [showEditProfile, setShowEditProfile] = useState(false);

    const isHost = account?.role === "host";
    const displayName = account?.fullName || account?.ownerName || "New Foodie";
    const username = account?.username || (account?.shopName
        ? account.shopName.toLowerCase().replace(/\s+/g, "")
        : "newfoodie");
    const bio = account?.bio || "Still deciding on my food personality. Ask me about the last thing I ate.";
    const profileImage = account?.profileImage || "";
    const currentBanner = account?.bannerImage || "";

    const profileInputRef = useRef(null);
    const bannerInputRef = useRef(null);

    function updateAccount(changes) {
        onAccountUpdate?.(changes);
    }

    function handleProfileImageChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => updateAccount({ profileImage: reader.result });
        reader.readAsDataURL(file);
        e.target.value = "";
    }

    function handleBannerChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => updateAccount({ bannerImage: reader.result });
        reader.readAsDataURL(file);
        e.target.value = "";
    }

    function saveProfile(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const name = data.get("displayName")?.trim() || displayName;
        const newUsername = data.get("username")?.trim().replace(/^@+/, "") || username;
        const newBio = data.get("bio")?.trim() || "";

        updateAccount({
            ...(isHost ? { ownerName: name } : { fullName: name }),
            username: newUsername,
            bio: newBio,
        });

        setShowEditProfile(false);
    }

    const initial = displayName.trim().charAt(0).toUpperCase() || "N";

    return (
        <div className="pp-app">
            <Sidebar onBackToHome={onBackToHome} onLogout={onLogout} />

            <main className="pp-main">
                <div className="pp-card">
                    <div
                        className="pp-banner"
                        style={{
                            backgroundImage: `url(${currentBanner || bannerImg})`,
                        }}
                    >
                        <div className="pp-banner-overlay">
                            <p className="pp-banner-script">
                                Good food<br />better moods
                            </p>

                            {/* Banner editing is intentionally separate from Edit Profile. */}
                            <button
                                type="button"
                                className="pp-banner-edit"
                                onClick={() => bannerInputRef.current?.click()}
                            >
                                <CameraIcon /> Change banner
                            </button>

                            <input
                                ref={bannerInputRef}
                                className="pp-hidden-file-input"
                                type="file"
                                accept="image/*"
                                onChange={handleBannerChange}
                            />
                        </div>
                    </div>

                    <div className="pp-identity">
                        <div className="pp-avatar-wrap">
                            {profileImage ? (
                                <img
                                    className="pp-avatar pp-avatar-image"
                                    src={profileImage}
                                    alt={`${displayName} profile`}
                                />
                            ) : (
                                <div className="pp-avatar">{initial}</div>
                            )}

                            <input
                                ref={profileInputRef}
                                className="pp-hidden-file-input"
                                type="file"
                                accept="image/*"
                                onChange={handleProfileImageChange}
                            />
                        </div>

                        <div className="pp-name-row">
                            <h1 className="pp-name">{displayName}</h1>
                            <span className="pp-role-pill">🍴 {isHost ? "Host" : "Guest"}</span>
                        </div>
                        <p className="pp-username">@{username}</p>

                        <button
                            type="button"
                            className="pp-edit-btn"
                            onClick={() => setShowEditProfile(true)}
                        >
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

                        <p className="pp-bio">{bio}</p>

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
                                className={`pp-tab ${activeTab === "cravings" ? "pp-tab-active" : ""}`}
                                onClick={() => setActiveTab("cravings")}
                            >
                                <BookmarkIcon /> Cravings
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

            {showEditProfile && (
                <div
                    className="pp-modal-backdrop"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) setShowEditProfile(false);
                    }}
                >
                    <form className="pp-edit-modal" onSubmit={saveProfile}>
                        <div className="pp-modal-header">
                            <div>
                                <span className="pp-modal-eyebrow">PROFILE SETTINGS</span>
                                <h2>Edit profile</h2>
                            </div>
                            <button
                                type="button"
                                className="pp-modal-close"
                                onClick={() => setShowEditProfile(false)}
                                aria-label="Close edit profile"
                            >
                                ×
                            </button>
                        </div>

                        <div className="pp-modal-picture-section">
                            <div className="pp-modal-avatar">
                                {profileImage ? (
                                    <img src={profileImage} alt="" />
                                ) : (
                                    initial
                                )}
                            </div>
                            <div>
                                <strong>Profile picture</strong>
                                <p>Choose a new picture from your computer.</p>
                                <button
                                    type="button"
                                    className="pp-picture-btn"
                                    onClick={() => profileInputRef.current?.click()}
                                >
                                    <CameraIcon /> Change picture
                                </button>
                            </div>
                        </div>

                        <div className="pp-modal-fields">
                            <label htmlFor="profile-display-name">Name</label>
                            <input
                                id="profile-display-name"
                                name="displayName"
                                type="text"
                                defaultValue={displayName}
                                maxLength="50"
                                required
                            />

                            <label htmlFor="profile-username">Username</label>
                            <input
                                id="profile-username"
                                name="username"
                                type="text"
                                defaultValue={username}
                                maxLength="30"
                                required
                            />

                            <label htmlFor="profile-bio">About</label>
                            <textarea
                                id="profile-bio"
                                name="bio"
                                defaultValue={bio}
                                maxLength="160"
                                rows="4"
                                placeholder="Tell people a little about yourself..."
                            />
                        </div>

                        <div className="pp-modal-actions">
                            <button
                                type="button"
                                className="pp-cancel-btn"
                                onClick={() => setShowEditProfile(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="pp-save-btn">
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
export default Profile;