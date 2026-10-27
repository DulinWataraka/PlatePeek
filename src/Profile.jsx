import { useState } from "react";
import "./Profile.css";
import plate1 from "./assets/pasta.png";
import plate2 from "./assets/pizza.png";
import plate3 from "./assets/sushi.png";
import plate4 from "./assets/pasta2.png";

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

/* Sample content (replace with real data when you add a backend) */

const GUEST_PLATES = [
    { name: "Creamy Carbonara", note: "Creamy · Rich · Comfort", image: plate1, likes: 42, comments: 12 },
    { name: "Wood-fired Pizza", note: "Crispy · Cheesy · Classic", image: plate2, likes: 36, comments: 8 },
    { name: "Sushi Platter", note: "Fresh · Light · Colourful", image: plate3, likes: 28, comments: 6 },
    { name: "Garlic Fried Rice", note: "Savory · Simple · Cozy", image: plate4, likes: 31, comments: 7 },
];

const HOST_DISHES = [
    { name: "Signature Pasta", note: "House special", image: plate1, likes: 58, comments: 14 },
    { name: "Margherita Pizza", note: "Best seller", image: plate2, likes: 49, comments: 11 },
    { name: "Chef's Sushi Set", note: "Fresh daily", image: plate3, likes: 37, comments: 9 },
    { name: "Spring Onion Rice", note: "Customer favourite", image: plate4, likes: 33, comments: 5 },
];

function PlateCard({ plate }) {
    return (
        <article className="pf-plate">
            <img src={plate.image} alt={plate.name} />
            <div className="pf-plate-body">
                <h3>{plate.name}</h3>
                <p>{plate.note}</p>
                <div className="pf-plate-stats">
                    <span>♥ {plate.likes}</span>
                    <span>💬 {plate.comments}</span>
                </div>
            </div>
        </article>
    );
}

function Sidebar({ isHost, onBackToHome, onEdit, onLogout }) {
    const items = [
        { key: "home", icon: "🏠", label: "Home", onClick: onBackToHome },
        { key: "profile", icon: "👤", label: "Profile", active: true },
        { key: "edit", icon: "✏️", label: isHost ? "Edit shop" : "Edit profile", onClick: onEdit },
    ];

    return (
        <aside className="pf-sidebar">
            <div className="pf-logo" onClick={onBackToHome}>
                <span className="pf-logo-icon">🍴</span>
                <span>plate peek</span>
            </div>

            <nav className="pf-side-nav" aria-label="Primary navigation">
                {items.map((item) => (
                    <button
                        key={item.key}
                        type="button"
                        className={`pf-side-link ${item.active ? "pf-side-link-active" : ""}`}
                        onClick={item.onClick}
                    >
                        <span className="pf-side-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <button type="button" className="pf-logout" onClick={onLogout}>
                Log out <span>→</span>
            </button>
        </aside>
    );
}

/* ---------- PROFILE VIEW ---------- */

function ProfileView({ account, onBackToHome, onLogout, onEdit }) {
    const isHost = account.role === "host";

    const guestName = account.fullName || "New Foodie";
    const guestUsername = account.username || "newfoodie";
    const shopName = account.shopName || "My Shop";
    const ownerName = account.ownerName || "New Owner";

    const title = isHost ? shopName : guestName;
    const subtitle = isHost ? `Run by ${ownerName}` : `@${guestUsername}`;
    const initial = title.charAt(0).toUpperCase();

    const bio =
        account.bio ||
        (isHost
            ? "Tell diners what makes your shop special."
            : "Tell people what you love to eat.");

    const stats = isHost
        ? [
            { value: HOST_DISHES.length, label: "Dishes" },
            { value: 128, label: "Followers" },
            { value: 24, label: "Reviews" },
        ]
        : [
            { value: GUEST_PLATES.length, label: "Plates" },
            { value: 128, label: "Followers" },
            { value: 94, label: "Following" },
        ];

    const details = isHost
        ? [
            { label: "Category", value: account.shopCategory || "Restaurant" },
            { label: "Address", value: account.shopAddress || "Not added yet" },
            { label: "Email", value: account.email || "Not added yet" },
        ]
        : [{ label: "Email", value: account.email || "Not added yet" }];

    const items = isHost ? HOST_DISHES : GUEST_PLATES;

    return (
        <div className="pf-page">
            <Sidebar
                isHost={isHost}
                onBackToHome={onBackToHome}
                onEdit={onEdit}
                onLogout={onLogout}
            />

            <main className="pf-main">
                {/* HEADER */}
                <section className="pf-header">
                    <div className="pf-avatar">
                        {account.profileImage ? (
                            <img src={account.profileImage} alt={`${title} profile`} />
                        ) : (
                            <span>{initial}</span>
                        )}
                    </div>

                    <div className="pf-header-info">
                        <span className="pf-role-badge">
                            {isHost ? "🧑‍🍳 HOST" : "🍴 GUEST"}
                        </span>
                        <h1>{title}</h1>
                        <p className="pf-subtitle">{subtitle}</p>
                        <p className="pf-bio">{bio}</p>
                    </div>

                    <button type="button" className="pf-edit-btn" onClick={onEdit}>
                        Edit profile
                    </button>
                </section>

                {/* STATS */}
                <section className="pf-stats">
                    {stats.map((s) => (
                        <div key={s.label} className="pf-stat">
                            <strong>{s.value}</strong>
                            <span>{s.label}</span>
                        </div>
                    ))}
                </section>

                {/* DETAILS */}
                <section className="pf-details">
                    <span className="pf-eyebrow">
                        {isHost ? "SHOP DETAILS" : "ACCOUNT"}
                    </span>
                    <dl>
                        {details.map((d) => (
                            <div key={d.label} className="pf-detail-row">
                                <dt>{d.label}</dt>
                                <dd>{d.value}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                {/* PLATES / MENU */}
                <section className="pf-content">
                    <span className="pf-eyebrow">
                        {isHost ? "OUR MENU" : "MY PLATES"}
                    </span>
                    <h2>{isHost ? "What we're serving." : "What you've been eating."}</h2>

                    <div className="pf-grid">
                        {items.map((plate) => (
                            <PlateCard key={plate.name} plate={plate} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

/* ---------- EDIT PROFILE PAGE (split layout like Login / Register) ---------- */

function EditProfile({ account, onBackToHome, onCancel, onSave }) {
    const isHost = account.role === "host";
    const [previewImage, setPreviewImage] = useState(account.profileImage || "");

    const currentName = isHost ? account.shopName || "My Shop" : account.fullName || "New Foodie";
    const initial = currentName.charAt(0).toUpperCase();

    function handleImageChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const text = (key) => (data.get(key) || "").toString().trim();

        if (isHost) {
            onSave({
                ownerName: text("ownerName") || account.ownerName,
                shopName: text("shopName") || account.shopName,
                shopCategory: text("shopCategory") || account.shopCategory,
                shopAddress: text("shopAddress"),
                email: text("email"),
                bio: text("bio"),
                profileImage: previewImage,
            });
        } else {
            onSave({
                fullName: text("fullName") || account.fullName,
                username: text("username").replace(/^@+/, "") || account.username,
                email: text("email"),
                bio: text("bio"),
                profileImage: previewImage,
            });
        }
    }

    return (
        <div className="pf-edit-page">
            <aside className="pf-edit-side">
                <div className="pf-edit-logo" onClick={onBackToHome}>
                    <span className="pf-logo-icon">🍴</span>
                    <span>plate peek</span>
                </div>

                <div className="pf-edit-side-content">
                    <span className="pf-side-badge">
                        {isHost ? "HOST ACCOUNT" : "GUEST ACCOUNT"}
                    </span>

                    <h1>
                        Make it
                        <br />
                        yours.
                    </h1>

                    <p>
                        {isHost
                            ? "Keep your shop details fresh so hungry diners can find you."
                            : "A few details help people know who's behind the plates."}
                    </p>
                </div>

                <div className="pf-edit-side-footer">PLATE PEEK / 2025</div>
            </aside>

            <main className="pf-edit-form-side">
                <div className="pf-edit-form-wrap">
                    <span className="pf-eyebrow">EDIT PROFILE</span>
                    <h2>{isHost ? "Update your shop." : "Update your details."}</h2>
                    <p className="pf-edit-subtext">
                        Changes show up on your profile straight away.
                    </p>

                    <form className="pf-edit-form" onSubmit={handleSubmit}>
                        <div className="pf-photo-row">
                            <div className="pf-avatar pf-avatar-small">
                                {previewImage ? <img src={previewImage} alt="" /> : <span>{initial}</span>}
                            </div>
                            <label className="pf-photo-btn">
                                {isHost ? "Change shop photo" : "Change photo"}
                                <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                            </label>
                        </div>

                        {isHost ? (
                            <>
                                <label htmlFor="ownerName">Owner full name</label>
                                <input id="ownerName" name="ownerName" type="text" defaultValue={account.ownerName || ""} maxLength="50" required />

                                <label htmlFor="shopName">Shop name</label>
                                <input id="shopName" name="shopName" type="text" defaultValue={account.shopName || ""} maxLength="50" required />

                                <label htmlFor="shopCategory">Shop category</label>
                                <select id="shopCategory" name="shopCategory" defaultValue={account.shopCategory || "Restaurant"}>
                                    {SHOP_CATEGORIES.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="shopAddress">Shop address</label>
                                <input id="shopAddress" name="shopAddress" type="text" defaultValue={account.shopAddress || ""} placeholder="123 Galle Road, Colombo" />
                            </>
                        ) : (
                            <>
                                <label htmlFor="fullName">Full name</label>
                                <input id="fullName" name="fullName" type="text" defaultValue={account.fullName || ""} maxLength="50" required />

                                <label htmlFor="username">Username</label>
                                <input id="username" name="username" type="text" defaultValue={account.username || ""} maxLength="30" required />
                            </>
                        )}

                        <label htmlFor="email">Email address</label>
                        <input id="email" name="email" type="email" defaultValue={account.email || ""} placeholder="you@example.com" />

                        <label htmlFor="bio">{isHost ? "About your shop" : "About you"}</label>
                        <textarea
                            id="bio"
                            name="bio"
                            rows="4"
                            maxLength="160"
                            defaultValue={account.bio || ""}
                            placeholder={isHost ? "Tell diners what makes your shop special..." : "Tell people a little about yourself..."}
                        />

                        <button type="submit" className="pf-save-btn">
                            Save changes <span>→</span>
                        </button>
                        <button type="button" className="pf-cancel-btn" onClick={onCancel}>
                            Cancel
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

/* ---------- MAIN EXPORT ---------- */

function Profile({ account, onBackToHome, onLogout, onAccountUpdate }) {
    const [editing, setEditing] = useState(false);

    if (editing) {
        return (
            <EditProfile
                account={account}
                onBackToHome={onBackToHome}
                onCancel={() => setEditing(false)}
                onSave={(changes) => {
                    onAccountUpdate(changes);
                    setEditing(false);
                }}
            />
        );
    }

    return (
        <ProfileView
            account={account}
            onBackToHome={onBackToHome}
            onLogout={onLogout}
            onEdit={() => setEditing(true)}
        />
    );
}

export default Profile;