import { useRef, useState } from "react";
import "./Profile.css";

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

const NAV_ITEMS = [
    { key: "home", icon: "🏠", label: "Home" },
    { key: "explore", icon: "🧭", label: "Explore" },
    { key: "challenges", icon: "🏆", label: "Challenges" },
    { key: "leaderboard", icon: "🥇", label: "Leaderboard" },
    { key: "notifications", icon: "🔔", label: "Notifications" },
    { key: "profile", icon: "👤", label: "Profile" },
];

const GUEST_BADGES = [
    { icon: "🔥", label: "7 day streak" },
    { icon: "🍜", label: "Ramen regular" },
    { icon: "🌶️", label: "Spice explorer" },
];

const GUEST_TABS = [
    { key: "plates", icon: "▦", label: "My plates" },
    { key: "saved", icon: "🔖", label: "Saved" },
    { key: "tagged", icon: "🏷️", label: "Tagged" },
];

const HOST_TABS = [
    { key: "menu", icon: "▦", label: "Menu" },
    { key: "photos", icon: "🖼️", label: "Photos" },
    { key: "reviews", icon: "⭐", label: "Reviews" },
];

function initialsFrom(name) {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
}

function Profile({ account, onBackToHome, onLogout }) {
    const isHost = account.role === "host";

    const [profile, setProfile] = useState(() =>
        isHost
            ? {
                avatar: null,
                shopName: account.shopName || "My Shop",
                shopCategory: account.shopCategory || "Restaurant",
                shopAddress: account.shopAddress || "",
                ownerName: account.ownerName || "Owner",
                bio: "Home-style plates, made fresh every day. Stop by, we save you a seat at the counter.",
            }
            : {
                avatar: null,
                fullName: account.fullName || "New Foodie",
                username: account.username || "newfoodie",
                bio: "Still deciding on my food personality. Ask me about the last thing I ate.",
                location: "Colombo, Sri Lanka",
            }
    );

    const [activeTab, setActiveTab] = useState(isHost ? "menu" : "plates");
    const [showEditModal, setShowEditModal] = useState(false);

    function handleSaveProfile(updated) {
        setProfile((prev) => ({ ...prev, ...updated }));
        setShowEditModal(false);
    }

    return (
        <div className="profile-page">
            <aside className="profile-sidebar">
                <div className="profile-logo" onClick={onBackToHome}>
                    <span className="profile-logo-icon">🍴</span>
                    <span>plate peek</span>
                </div>

                <nav className="profile-nav">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.key}
                            className={`profile-nav-item ${
                                item.key === "profile" ? "profile-nav-item-active" : ""
                            }`}
                            type="button"
                        >
                            <span className="profile-nav-icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="profile-sidebar-footer">
                    <button className="profile-create-btn" type="button">
                        <span>+</span> {isHost ? "Add menu item" : "Create post"}
                    </button>
                    <button className="profile-logout-btn" type="button" onClick={onLogout}>
                        Log out
                    </button>
                </div>
            </aside>

            <main className="profile-main">
                {isHost ? (
                    <HostProfile
                        profile={profile}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        onEdit={() => setShowEditModal(true)}
                    />
                ) : (
                    <GuestProfile
                        profile={profile}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        onEdit={() => setShowEditModal(true)}
                    />
                )}
            </main>

            {showEditModal && (
                <EditProfileModal
                    isHost={isHost}
                    profile={profile}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleSaveProfile}
                />
            )}
        </div>
    );
}

function GuestProfile({ profile, activeTab, setActiveTab, onEdit }) {
    return (
        <>
            <section className="profile-cover profile-cover-guest">
                <div className="profile-cover-photos">
                    <span className="cover-photo cover-photo-1" />
                    <span className="cover-photo cover-photo-2" />
                </div>
            </section>

            <section className="profile-identity">
                <div className="profile-avatar-wrap">
                    <div className="profile-avatar">
                        {profile.avatar ? (
                            <img src={profile.avatar} alt="Profile avatar" />
                        ) : (
                            initialsFrom(profile.fullName)
                        )}
                    </div>
                    <button className="avatar-edit-btn" type="button" onClick={onEdit} aria-label="Edit picture">
                        📷
                    </button>
                </div>

                <button className="profile-edit-btn" type="button" onClick={onEdit}>
                    ✎ Edit profile
                </button>

                <h1 className="profile-name">
                    {profile.fullName} <span className="role-pill role-pill-guest">🍴 Guest</span>
                </h1>
                <p className="profile-username">@{profile.username}</p>
                <p className="profile-meta">
                    <span>📍 {profile.location}</span>
                    <span className="meta-dot">·</span>
                    <span>Member since 2025</span>
                </p>
                <p className="profile-bio">{profile.bio}</p>

                <div className="stats-card stats-card-light">
                    <div className="stat">
                        <span className="stat-value">6</span>
                        <span className="stat-label">Plates</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">128</span>
                        <span className="stat-label">Followers</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">94</span>
                        <span className="stat-label">Following</span>
                    </div>
                </div>

                <div className="level-card">
                    <div className="level-card-top">
                        <span className="level-pill">Lvl 18 · Food Explorer</span>
                        <span className="streak-pill">🔥 12 day streak</span>
                    </div>
                    <div className="xp-track">
                        <div className="xp-fill" style={{ width: "84%" }} />
                    </div>
                    <div className="xp-labels">
                        <span>8,450 XP</span>
                        <span>10,000 XP</span>
                    </div>
                </div>

                <div className="badges-row">
                    {GUEST_BADGES.map((b) => (
                        <span className="badge-chip" key={b.label}>
                            {b.icon} {b.label}
                        </span>
                    ))}
                </div>
            </section>

            <Tabs tabs={GUEST_TABS} active={activeTab} onChange={setActiveTab} />
            <TabGrid emptyLabel="No plates here yet — snap your next meal to fill this up." />
        </>
    );
}

function HostProfile({ profile, activeTab, setActiveTab, onEdit }) {
    return (
        <>
            <section className="profile-cover profile-cover-host">
                <span className="open-now-pill">🟢 Open now</span>
            </section>

            <section className="profile-identity">
                <div className="profile-avatar-wrap profile-avatar-wrap-host">
                    <div className="profile-avatar profile-avatar-host">
                        {profile.avatar ? (
                            <img src={profile.avatar} alt="Shop logo" />
                        ) : (
                            initialsFrom(profile.shopName)
                        )}
                    </div>
                    <span className="verified-badge">✓</span>
                    <button className="avatar-edit-btn" type="button" onClick={onEdit} aria-label="Edit shop photo">
                        📷
                    </button>
                </div>

                <button className="profile-edit-btn" type="button" onClick={onEdit}>
                    ✎ Edit shop
                </button>

                <h1 className="profile-name">
                    {profile.shopName} <span className="role-pill role-pill-host">🍳 Shop</span>
                </h1>
                <p className="category-pill">{profile.shopCategory}</p>
                <p className="profile-meta">
                    <span>★★★★★ 4.8 (128 reviews)</span>
                </p>
                <p className="profile-meta">
                    <span>📍 {profile.shopAddress || "Gampaha"}</span>
                </p>
                <p className="profile-bio">{profile.bio}</p>

                <div className="stats-card stats-card-dark">
                    <div className="stat">
                        <span className="stat-value">4</span>
                        <span className="stat-label">Menu items</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">128</span>
                        <span className="stat-label">Reviews</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">512</span>
                        <span className="stat-label">Followers</span>
                    </div>
                </div>
            </section>

            <Tabs tabs={HOST_TABS} active={activeTab} onChange={setActiveTab} />
            <TabGrid emptyLabel="No items added yet — add your first dish to the menu." />
        </>
    );
}

function Tabs({ tabs, active, onChange }) {
    return (
        <div className="profile-tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    type="button"
                    className={`profile-tab ${active === tab.key ? "profile-tab-active" : ""}`}
                    onClick={() => onChange(tab.key)}
                >
                    <span>{tab.icon}</span> {tab.label}
                </button>
            ))}
        </div>
    );
}

function TabGrid({ emptyLabel }) {
    return (
        <div className="profile-tab-grid">
            {Array.from({ length: 6 }).map((_, i) => (
                <div className="tab-grid-item" key={i} />
            ))}
            <p className="tab-grid-empty">{emptyLabel}</p>
        </div>
    );
}

function EditProfileModal({ isHost, profile, onClose, onSave }) {
    const fileInputRef = useRef(null);
    const [form, setForm] = useState({ ...profile });
    const [avatarPreview, setAvatarPreview] = useState(profile.avatar);

    function updateField(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    function handleAvatarChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setAvatarPreview(reader.result);
            updateField("avatar", reader.result);
        };
        reader.readAsDataURL(file);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave(form);
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{isHost ? "Edit shop" : "Edit profile"}</h2>
                    <button className="modal-close" type="button" onClick={onClose} aria-label="Close">
                        ✕
                    </button>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="modal-avatar-section">
                        <div className="modal-avatar">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Avatar preview" />
                            ) : (
                                initialsFrom(isHost ? form.shopName : form.fullName)
                            )}
                        </div>
                        <button
                            type="button"
                            className="modal-avatar-btn"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            📷 Change {isHost ? "logo" : "picture"}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleAvatarChange}
                        />
                    </div>

                    {isHost ? (
                        <>
                            <label htmlFor="edit-shopName">Shop name</label>
                            <input
                                id="edit-shopName"
                                type="text"
                                value={form.shopName}
                                onChange={(e) => updateField("shopName", e.target.value)}
                            />

                            <label htmlFor="edit-shopCategory">Shop category</label>
                            <select
                                id="edit-shopCategory"
                                value={form.shopCategory}
                                onChange={(e) => updateField("shopCategory", e.target.value)}
                            >
                                {SHOP_CATEGORIES.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="edit-shopAddress">Shop address</label>
                            <input
                                id="edit-shopAddress"
                                type="text"
                                value={form.shopAddress}
                                onChange={(e) => updateField("shopAddress", e.target.value)}
                            />

                            <label htmlFor="edit-bio">Description</label>
                            <textarea
                                id="edit-bio"
                                rows={3}
                                value={form.bio}
                                onChange={(e) => updateField("bio", e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            <label htmlFor="edit-fullName">Full name</label>
                            <input
                                id="edit-fullName"
                                type="text"
                                value={form.fullName}
                                onChange={(e) => updateField("fullName", e.target.value)}
                            />

                            <label htmlFor="edit-username">Username</label>
                            <input
                                id="edit-username"
                                type="text"
                                value={form.username}
                                onChange={(e) => updateField("username", e.target.value.replace(/\s/g, ""))}
                            />

                            <label htmlFor="edit-location">Location</label>
                            <input
                                id="edit-location"
                                type="text"
                                value={form.location}
                                onChange={(e) => updateField("location", e.target.value)}
                            />

                            <label htmlFor="edit-bio">Bio</label>
                            <textarea
                                id="edit-bio"
                                rows={3}
                                value={form.bio}
                                onChange={(e) => updateField("bio", e.target.value)}
                            />
                        </>
                    )}

                    <div className="modal-actions">
                        <button type="button" className="modal-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="modal-save">
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;