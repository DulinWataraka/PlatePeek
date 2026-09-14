import "./Profile.css";
import bannerImg from "./assets/foodbanner.jpg";
import bannerAlt from "./assets/foodbanner2.jpg";
import plate1 from "./assets/pasta.png";
import plate2 from "./assets/pizza.png";
import plate3 from "./assets/sushi.png";
import plate4 from "./assets/pasta2.png";
import { useRef, useState } from "react";

function Icon({ children, size = 18, className = "" }) {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {children}
        </svg>
    );
}

function HomeIcon() {
    return <Icon><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 9.5V20h13V9.5" /><path d="M9.5 20v-6h5v6" /></Icon>;
}

function ExploreIcon() {
    return <Icon><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.5 4.5-4.5 2.5 2.5-4.5z" /></Icon>;
}

function ChallengesIcon() {
    return <Icon><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path d="M17 5h3a2 2 0 0 1-2 4" /><path d="M7 5H4a2 2 0 0 0 2 4" /></Icon>;
}

function LeaderboardIcon() {
    return <Icon><circle cx="12" cy="8" r="5" /><path d="M8.5 12.5 7 21l5-2.5L17 21l-1.5-8.5" /></Icon>;
}

function BellIcon() {
    return <Icon><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 19a2 2 0 0 0 4 0" /></Icon>;
}

function ProfileIcon() {
    return <Icon fill="currentColor"><circle cx="12" cy="8" r="4" fill="currentColor" stroke="none" /><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" fill="currentColor" stroke="none" /></Icon>;
}

function PencilIcon() {
    return <Icon size={15}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></Icon>;
}

function CameraIcon() {
    return <Icon size={13}><path d="M4 8h3l2-2h6l2 2h3v11H4z" /><circle cx="12" cy="13.5" r="3.2" /></Icon>;
}

function PinIcon() {
    return <Icon size={13} fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" fill="currentColor" stroke="none" /></Icon>;
}

function GridIcon() {
    return <Icon size={16}><rect x="3" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" /></Icon>;
}

function BookmarkIcon() {
    return <Icon size={16}><path d="M6 3h12v18l-6-4-6 4Z" /></Icon>;
}

function TagIcon() {
    return <Icon size={16}><path d="M12.5 3H5v7.5L14.5 20 21 13.5Z" /><circle cx="8.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" /></Icon>;
}

function SearchIcon() {
    return <Icon size={16}><circle cx="10.8" cy="10.8" r="6.4" /><path d="m16 16 4.2 4.2" /></Icon>;
}

function MoreIcon() {
    return <Icon size={18}><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></Icon>;
}

function HeartIcon() {
    return <Icon size={14}><path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.8Z" /></Icon>;
}

function CommentIcon() {
    return <Icon size={14}><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.7 8.7 0 0 1-4-.9L4 20l1.5-3.5A7.1 7.1 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" /></Icon>;
}

function UsersIcon() {
    return <Icon size={22}><path d="M16 20v-1.3a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20" /><circle cx="9.5" cy="7.5" r="3.5" /><path d="M17 11a3.5 3.5 0 0 0 0-7" /><path d="M21 20v-1.3a4 4 0 0 0-3-3.8" /></Icon>;
}

function PlateIcon() {
    return <Icon size={22}><circle cx="12" cy="12" r="7.5" /><path d="M4.5 12h15" /><path d="M8 4.8c1.2 1.4 1.8 3 1.8 5.1" /></Icon>;
}

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
            <button type="button" className="pp-sidebar-logo" onClick={onBackToHome}>
                <span className="pp-logo-icon">🍴</span>
                <span>plate peek</span>
            </button>

            <nav className="pp-nav" aria-label="Primary navigation">
                {navItems.map((item) => (
                    <button
                        key={item.key}
                        type="button"
                        className={`pp-nav-item ${item.key === "profile" ? "pp-nav-item-active" : ""}`}
                        onClick={item.onClick}
                    >
                        <span className="pp-nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <button type="button" className="pp-logout" onClick={onLogout}>Log out</button>
        </aside>
    );
}

function FoodCard({ plate }) {
    return (
        <article className="pp-food-card">
            <div className="pp-food-image-wrap">
                <img src={plate.image} alt={plate.name} className="pp-food-image" />
                <span className={`pp-category pp-category-${plate.category.toLowerCase()}`}>{plate.category}</span>
                <button type="button" className="pp-card-menu" aria-label={`More options for ${plate.name}`}><MoreIcon /></button>
            </div>
            <div className="pp-food-card-body">
                <h3>{plate.name}</h3>
                <p>{plate.description}</p>
                <div className="pp-food-card-footer">
                    <span><HeartIcon /> {plate.likes}</span>
                    <span><CommentIcon /> {plate.comments}</span>
                </div>
            </div>
        </article>
    );
}

function Profile({ account, onBackToHome, onLogout, onAccountUpdate }) {
    const [activeTab, setActiveTab] = useState("plates");
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const isHost = account?.role === "host";
    const displayName = account?.fullName || account?.ownerName || "New Owner";
    const username = account?.username || (account?.shopName
        ? account.shopName.toLowerCase().replace(/\s+/g, "")
        : "myshop");
    const bio = account?.bio || "Food lover, home cook and explorer of new flavours. Sharing my favourite recipes and food ideas since 2025.";
    const profileImage = account?.profileImage || "";
    const currentBanner = account?.bannerImage || "";
    const profileInputRef = useRef(null);
    const bannerInputRef = useRef(null);

    const plates = [
        { name: "Chicken Biryani", description: "Aromatic · Spicy · Classic", category: "Main", image: plate1, likes: 42, comments: 12 },
        { name: "Creamy Alfredo Pasta", description: "Creamy · Easy · Delicious", category: "Pasta", image: plate2, likes: 36, comments: 8 },
        { name: "Berry Smoothie Bowl", description: "Healthy · Fresh · Quick", category: "Breakfast", image: plate3, likes: 28, comments: 6 },
        { name: "Grilled Chicken Skewers", description: "Juicy · Spicy · BBQ", category: "BBQ", image: bannerAlt, likes: 45, comments: 10 },
        { name: "Roasted Garden Plate", description: "Fresh · Colorful · Seasonal", category: "Salad", image: plate4, likes: 31, comments: 7 },
        { name: "Sunday Comfort Bowl", description: "Warm · Hearty · Homemade", category: "Main", image: bannerImg, likes: 24, comments: 5 },
        { name: "Golden Garlic Pasta", description: "Savory · Simple · Cozy", category: "Pasta", image: plate1, likes: 39, comments: 9 },
        { name: "Tropical Fruit Toast", description: "Bright · Sweet · Fresh", category: "Breakfast", image: plate3, likes: 22, comments: 4 },
    ];

    const visiblePlates = plates.filter((plate) => (
        plate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plate.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plate.category.toLowerCase().includes(searchTerm.toLowerCase())
    ));

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

    return (
        <div className="pp-app">
            <Sidebar onBackToHome={onBackToHome} onLogout={onLogout} />

            <main className="pp-main">
                <div className="pp-card">
                    <div
                        className="pp-banner"
                        style={{ backgroundImage: `url(${currentBanner || bannerImg})` }}
                    >
                        <div className="pp-banner-overlay">
                            <p className="pp-banner-script">Good Food<br /><em>Better Days</em></p>
                            <p className="pp-banner-note">Cook<br />Share<br />Explore</p>
                            <button type="button" className="pp-banner-edit" onClick={() => bannerInputRef.current?.click()}>
                                <CameraIcon /> Change cover
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

                    <div className="pp-profile-head">
                        <section className="pp-profile-summary">
                            <div className="pp-summary-top">
                                <div className="pp-avatar-wrap">
                                    {profileImage ? (
                                        <img className="pp-avatar pp-avatar-image" src={profileImage} alt={`${displayName} profile`} />
                                    ) : (
                                        <div className="pp-avatar"><span>🍴</span></div>
                                    )}
                                    <span className="pp-status-dot" aria-label="Online" />
                                    <input
                                        ref={profileInputRef}
                                        className="pp-hidden-file-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfileImageChange}
                                    />
                                </div>

                                <div className="pp-summary-details">
                                    <div className="pp-name-row">
                                        <div>
                                            <h1 className="pp-name">{displayName}</h1>
                                            <p className="pp-username">@{username}</p>
                                        </div>
                                        <span className="pp-role-pill">🍴 {isHost ? "Host" : "Foodie"}</span>
                                    </div>
                                    <p className="pp-bio">{bio}</p>
                                    <p className="pp-meta">
                                        <PinIcon /> Colombo, Sri Lanka <span className="pp-dot">·</span> Member since 2025
                                    </p>
                                </div>

                                <div className="pp-profile-actions">
                                    <button type="button" className="pp-edit-btn" onClick={() => setShowEditProfile(true)}>
                                        <PencilIcon /> Edit profile
                                    </button>
                                    <button type="button" className="pp-more-btn" aria-label="More profile options"><MoreIcon /></button>
                                </div>
                            </div>

                            <div className="pp-stats">
                                <div className="pp-stat">
                                    <span className="pp-stat-icon"><PlateIcon /></span>
                                    <strong>6</strong>
                                    <span>Plates</span>
                                </div>
                                <div className="pp-stat">
                                    <span className="pp-stat-icon"><UsersIcon /></span>
                                    <strong>128</strong>
                                    <span>Followers</span>
                                </div>
                                <div className="pp-stat">
                                    <span className="pp-stat-icon"><UsersIcon /></span>
                                    <strong>94</strong>
                                    <span>Following</span>
                                </div>
                            </div>
                        </section>

                        <section className="pp-level-card">
                            <div className="pp-level-heading">
                                <span className="pp-flame">🔥</span>
                                <div>
                                    <h2>7 day streak</h2>
                                    <p>Keep cooking, keep sharing!</p>
                                </div>
                                <span className="pp-level-arrow">›</span>
                            </div>
                            <div className="pp-progress-track">
                                <div className="pp-progress-fill" style={{ width: "84%" }} />
                            </div>
                            <div className="pp-level-bottom">
                                <span>8,450 XP</span>
                                <span>10,000 XP</span>
                            </div>
                            <div className="pp-badges">
                                <span className="pp-badge">🔥 7 day streak</span>
                                <span className="pp-badge">🍜 Ramen regular</span>
                                <span className="pp-badge">🌶️ Spice explorer</span>
                            </div>
                        </section>
                    </div>

                    <div className="pp-content-toolbar">
                        <div className="pp-tabs">
                            <button type="button" className={`pp-tab ${activeTab === "plates" ? "pp-tab-active" : ""}`} onClick={() => setActiveTab("plates")}>
                                <GridIcon /> My plates
                            </button>
                            <button type="button" className={`pp-tab ${activeTab === "cravings" ? "pp-tab-active" : ""}`} onClick={() => setActiveTab("cravings")}>
                                <BookmarkIcon /> Cravings
                            </button>
                            <button type="button" className={`pp-tab ${activeTab === "tagged" ? "pp-tab-active" : ""}`} onClick={() => setActiveTab("tagged")}>
                                <TagIcon /> Tagged
                            </button>
                        </div>
                        <label className="pp-search">
                            <SearchIcon />
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search my plates..."
                                aria-label="Search my plates"
                            />
                        </label>
                    </div>

                    <div className="pp-plates-grid">
                        {visiblePlates.map((plate) => <FoodCard key={`${plate.name}-${plate.category}`} plate={plate} />)}
                    </div>
                    {visiblePlates.length === 0 && <p className="pp-empty-state">No plates match that search.</p>}
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
                            <button type="button" className="pp-modal-close" onClick={() => setShowEditProfile(false)} aria-label="Close edit profile">×</button>
                        </div>

                        <div className="pp-modal-picture-section">
                            <div className="pp-modal-avatar">
                                {profileImage ? <img src={profileImage} alt="" /> : <span>🍴</span>}
                            </div>
                            <div>
                                <strong>Profile picture</strong>
                                <p>Choose a new picture from your computer.</p>
                                <button type="button" className="pp-picture-btn" onClick={() => profileInputRef.current?.click()}>
                                    <CameraIcon /> Change picture
                                </button>
                            </div>
                        </div>

                        <div className="pp-modal-fields">
                            <label htmlFor="profile-display-name">Name</label>
                            <input id="profile-display-name" name="displayName" type="text" defaultValue={displayName} maxLength="50" required />
                            <label htmlFor="profile-username">Username</label>
                            <input id="profile-username" name="username" type="text" defaultValue={username} maxLength="30" required />
                            <label htmlFor="profile-bio">About</label>
                            <textarea id="profile-bio" name="bio" defaultValue={bio} maxLength="160" rows="4" placeholder="Tell people a little about yourself..." />
                        </div>

                        <div className="pp-modal-actions">
                            <button type="button" className="pp-cancel-btn" onClick={() => setShowEditProfile(false)}>Cancel</button>
                            <button type="submit" className="pp-save-btn">Save changes</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Profile;