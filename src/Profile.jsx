import { useEffect, useId, useRef, useState } from "react";
import "./Profile.css";
import Icon from "./ProfileIcons.jsx";
import {
    CUISINES,
    DEFAULT_CUISINES,
    INITIAL_SAVED_IDS,
    SAMPLE_NOTIFICATIONS,
    SAMPLE_POSTS,
    SAMPLE_REVIEWS,
    SAMPLE_SAVED_FROM_OTHERS,
    sampleCommentsFor,
} from "./profileData.js";

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

const TABS = [
    { key: "posts", label: "Posts" },
    { key: "reviews", label: "Reviews" },
    { key: "saved", label: "Saved" },
];

/* ---------- HELPERS ---------- */

function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 30);
}

function getInitials(name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    const letters = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : (parts[0] || "?").slice(0, 2);
    return letters.toUpperCase();
}

let idCounter = 0;
function newId(prefix) {
    idCounter += 1;
    return `${prefix}-new-${idCounter}`;
}

function formatCount(n) {
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    return String(n);
}

/* Turns the account object from App.jsx into what the profile shows */
function getProfile(account) {
    const isHost = account.role === "host";
    const name = isHost ? account.shopName || "My Shop" : account.fullName || "New Foodie";
    const username = account.username || (isHost ? slugify(name) : "newfoodie");

    return {
        isHost,
        name,
        username,
        initials: getInitials(name),
        bio: account.bio || "",
        location: isHost ? account.shopAddress : account.location,
        category: isHost ? account.shopCategory || "Restaurant" : "",
        memberSince: account.memberSince,
        verified: Boolean(account.verified),
        cuisines: account.cuisines || DEFAULT_CUISINES,
        following: account.following ?? 94,
        followers: account.followers ?? 128,
    };
}

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        // Clipboard API is blocked on plain http, fall back to a hidden textarea
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        area.remove();
        return ok;
    }
}

/* ---------- SMALL BUILDING BLOCKS ---------- */

function Avatar({ image, initials, name, className = "" }) {
    return (
        <div className={`pf-avatar ${className}`}>
            {image ? <img src={image} alt={`${name} profile`} /> : <span aria-hidden="true">{initials}</span>}
        </div>
    );
}

function IconButton({ icon, label, onClick, className = "" }) {
    return (
        <button type="button" className={`pf-icon-btn ${className}`} onClick={onClick} aria-label={label} data-tip={label}>
            <Icon name={icon} size={22} />
        </button>
    );
}

/* Native <dialog> gives us focus trapping and Escape-to-close for free */
function Modal({ title, onClose, children }) {
    const ref = useRef(null);
    const titleId = useId();

    useEffect(() => {
        const dialog = ref.current;
        if (dialog && !dialog.open) dialog.showModal();
    }, []);

    return (
        <dialog
            ref={ref}
            className="pf-modal"
            aria-labelledby={titleId}
            onClose={onClose}
            onClick={(e) => {
                if (e.target === ref.current) onClose();
            }}
        >
            <div className="pf-modal-inner">
                <div className="pf-modal-head">
                    <h2 id={titleId}>{title}</h2>
                    <button type="button" className="pf-modal-close" onClick={onClose} aria-label="Close">
                        <Icon name="close" size={20} />
                    </button>
                </div>
                {children}
            </div>
        </dialog>
    );
}

function useDismiss(open, onDismiss, ignoreSelector) {
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return undefined;
        function handlePointer(e) {
            if (ignoreSelector && e.target.closest?.(ignoreSelector)) return;
            if (ref.current && !ref.current.contains(e.target)) onDismiss();
        }
        function handleKey(e) {
            if (e.key === "Escape") onDismiss();
        }
        document.addEventListener("mousedown", handlePointer);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handlePointer);
            document.removeEventListener("keydown", handleKey);
        };
    }, [open, onDismiss, ignoreSelector]);

    return ref;
}

function OptionsMenu({ label, items }) {
    const [open, setOpen] = useState(false);
    const ref = useDismiss(open, () => setOpen(false));
    const menuId = useId();

    return (
        <div className="pf-menu-wrap" ref={ref}>
            <button
                type="button"
                className="pf-more-btn"
                aria-label={label}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls={open ? menuId : undefined}
                onClick={() => setOpen((v) => !v)}
            >
                <Icon name="more" size={20} />
            </button>

            {open && (
                <div className="pf-menu" role="menu" id={menuId}>
                    {items.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            role="menuitem"
                            className={`pf-menu-item ${item.danger ? "pf-menu-item-danger" : ""}`}
                            onClick={() => {
                                setOpen(false);
                                item.onSelect();
                            }}
                        >
                            <Icon name={item.icon} size={18} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ---------- POST / REVIEW CARD ---------- */

function FoodCard({ item, liked, commentCount, onLike, onComment, menuItems }) {
    return (
        <article className="pf-card">
            <div className="pf-card-media">
                <img src={item.image} alt={item.title} loading="lazy" />
                <span className="pf-card-tag">
                    <Icon name="pin" size={13} strokeWidth={2} />
                    {item.tag}
                </span>
            </div>

            <div className="pf-card-body">
                <h3>{item.title}</h3>
                <p className="pf-card-meta">
                    {item.meta.filter(Boolean).map((part, i) => (
                        <span key={part}>
                            {i > 0 && <span className="pf-dot" aria-hidden="true">•</span>}
                            {part}
                        </span>
                    ))}
                </p>

                <div className="pf-card-actions">
                    <button
                        type="button"
                        className={`pf-action ${liked ? "pf-action-liked" : ""}`}
                        onClick={onLike}
                        aria-pressed={liked}
                        aria-label={`${liked ? "Unlike" : "Like"} ${item.title}, ${item.likes + (liked ? 1 : 0)} likes`}
                    >
                        <Icon name={liked ? "heartFilled" : "heart"} size={19} />
                        <span>{formatCount(item.likes + (liked ? 1 : 0))}</span>
                    </button>
                    <button
                        type="button"
                        className="pf-action"
                        onClick={onComment}
                        aria-label={`Comments on ${item.title}, ${commentCount} comments`}
                    >
                        <Icon name="comment" size={18} />
                        <span>{formatCount(commentCount)}</span>
                    </button>

                    <OptionsMenu label={`More options for ${item.title}`} items={menuItems} />
                </div>

                <p className="pf-card-text">{item.text}</p>
                {item.rating ? (
                    <p className="pf-card-rating" aria-label={`Rated ${item.rating} out of 10`}>
                        {item.rating}/10
                    </p>
                ) : null}
            </div>
        </article>
    );
}

/* ---------- SIDEBAR ---------- */

function Sidebar({ profile, profileImage, activeKey, hasUnread, notifOpen, onCloseNotifications, onNavigate, onEdit, onLogout }) {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useDismiss(userMenuOpen, () => setUserMenuOpen(false));

    const mainItems = [
        { key: "home", icon: "home", label: "Home" },
        { key: "discover", icon: "compass", label: "Discover" },
        { key: "create", icon: "plus", label: "Create" },
        { key: "plates", icon: "utensils", label: "My plates" },
        { key: "saved", icon: "bookmark", label: "Saved" },
    ];

    function renderLink(item) {
        const active = activeKey === item.key;
        return (
            <button
                key={item.key}
                type="button"
                className={`pf-side-link ${active ? "pf-side-link-active" : ""}`}
                aria-current={active ? "page" : undefined}
                aria-label={item.label}
                title={item.label}
                data-notif-toggle={item.key === "notifications" ? "" : undefined}
                onClick={() => onNavigate(item.key)}
            >
                <Icon name={item.icon} size={24} strokeWidth={1.6} />
                <span className="pf-side-label">{item.label}</span>
                {item.badge && <span className="pf-side-dot" aria-label="Unread" />}
            </button>
        );
    }

    return (
        <aside className="pf-sidebar">
            <button type="button" className="pf-logo" onClick={() => onNavigate("home")} aria-label="Platepeek home">
                <span className="pf-logo-icon">
                    <Icon name="sparkle" size={28} strokeWidth={1.8} />
                </span>
                <span className="pf-logo-text">
                    <span className="pf-logo-name">platepeek</span>
                    <span className="pf-logo-tagline">THE GOOD STUFF</span>
                </span>
            </button>

            <nav className="pf-side-nav" aria-label="Primary navigation">
                {mainItems.map(renderLink)}
                <hr className="pf-side-divider" />
                <div className="pf-notif-wrap">
                    {renderLink({ key: "notifications", icon: "bell", label: "Notifications", badge: hasUnread })}
                    {notifOpen && <NotificationsPanel onClose={onCloseNotifications} />}
                </div>
            </nav>

            <div className="pf-side-user-wrap" ref={userMenuRef}>
                {userMenuOpen && (
                    <div className="pf-user-menu" role="menu">
                        <button type="button" role="menuitem" className="pf-menu-item" onClick={() => { setUserMenuOpen(false); onEdit(); }}>
                            <Icon name="pen" size={18} />
                            <span>Edit profile</span>
                        </button>
                        <button type="button" role="menuitem" className="pf-menu-item pf-menu-item-danger" onClick={onLogout}>
                            <Icon name="logout" size={18} />
                            <span>Log out</span>
                        </button>
                    </div>
                )}
                <button
                    type="button"
                    className="pf-side-user"
                    aria-haspopup="menu"
                    aria-expanded={userMenuOpen}
                    aria-label={`${profile.name}, account menu`}
                    onClick={() => setUserMenuOpen((v) => !v)}
                >
                    <Avatar image={profileImage} initials={profile.initials} name={profile.name} className="pf-avatar-xs" />
                    <span className="pf-side-user-name">{profile.name}</span>
                    <Icon name="chevronRight" size={20} className="pf-side-user-chevron" />
                </button>
            </div>
        </aside>
    );
}

/* ---------- DIALOGS ---------- */

function CommentsDialog({ item, comments, onAdd, onClose }) {
    const [draft, setDraft] = useState("");

    return (
        <Modal title={`Comments · ${item.title}`} onClose={onClose}>
            <ul className="pf-comment-list">
                {comments.map((c) => (
                    <li key={c.id}>
                        <strong>@{c.author}</strong> {c.text}
                    </li>
                ))}
            </ul>
            <form
                className="pf-comment-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!draft.trim()) return;
                    onAdd(draft.trim());
                    setDraft("");
                }}
            >
                <label htmlFor="pf-comment-input" className="pf-sr-only">Add a comment</label>
                <input
                    id="pf-comment-input"
                    type="text"
                    value={draft}
                    maxLength="200"
                    placeholder="Add a comment…"
                    onChange={(e) => setDraft(e.target.value)}
                    autoFocus
                />
                <button type="submit" className="pf-primary-btn" disabled={!draft.trim()}>
                    Post
                </button>
            </form>
        </Modal>
    );
}

function CreatePlateDialog({ onCreate, onClose }) {
    const [image, setImage] = useState("");

    function handleImageChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result);
        reader.readAsDataURL(file);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const text = (key) => (data.get(key) || "").toString().trim();
        onCreate({
            dish: text("dish"),
            restaurant: text("restaurant"),
            location: text("location"),
            caption: text("caption"),
            rating: Number(text("rating")) || null,
            image,
        });
    }

    return (
        <Modal title="Share a plate" onClose={onClose}>
            <form className="pf-create-form" onSubmit={handleSubmit}>
                <label className={`pf-upload ${image ? "pf-upload-filled" : ""}`}>
                    {image ? <img src={image} alt="Selected dish" /> : (
                        <>
                            <Icon name="image" size={28} />
                            <span>Add a photo of your dish</span>
                        </>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} required={!image} className="pf-sr-only" />
                </label>

                <label htmlFor="pf-dish">Dish name</label>
                <input id="pf-dish" name="dish" type="text" maxLength="60" required placeholder="Creamy mushroom pasta" />

                <div className="pf-form-row">
                    <div>
                        <label htmlFor="pf-restaurant">Restaurant</label>
                        <input id="pf-restaurant" name="restaurant" type="text" maxLength="50" required placeholder="The Pasta House" />
                    </div>
                    <div>
                        <label htmlFor="pf-location">Location</label>
                        <input id="pf-location" name="location" type="text" maxLength="40" placeholder="Colombo 3" />
                    </div>
                </div>

                <label htmlFor="pf-caption">Short review</label>
                <textarea id="pf-caption" name="caption" rows="3" maxLength="160" placeholder="What made it good?" />

                <label htmlFor="pf-rating">Rating</label>
                <select id="pf-rating" name="rating" defaultValue="">
                    <option value="">No rating</option>
                    {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>{n}/10</option>
                    ))}
                </select>

                <button type="submit" className="pf-primary-btn pf-primary-btn-wide">Share plate</button>
            </form>
        </Modal>
    );
}

function NotificationsPanel({ onClose }) {
    const ref = useDismiss(true, onClose, "[data-notif-toggle]");
    return (
        <div className="pf-notif-panel" ref={ref} role="dialog" aria-label="Notifications">
            <div className="pf-notif-head">
                <h2>Notifications</h2>
                <button type="button" className="pf-modal-close" onClick={onClose} aria-label="Close notifications">
                    <Icon name="close" size={18} />
                </button>
            </div>
            <ul>
                {SAMPLE_NOTIFICATIONS.map((n) => (
                    <li key={n.id}>
                        <span>{n.text}</span>
                        <time>{n.time}</time>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ---------- PROFILE VIEW ---------- */

function ProfileView({ account, onBackToHome, onLogout, onEdit }) {
    const profile = getProfile(account);

    const [activeTab, setActiveTab] = useState("posts");
    const [posts, setPosts] = useState(SAMPLE_POSTS);
    const [savedIds, setSavedIds] = useState(() => new Set(INITIAL_SAVED_IDS));
    const [likedIds, setLikedIds] = useState(() => new Set());
    const [addedComments, setAddedComments] = useState({});
    const [commentsFor, setCommentsFor] = useState(null);
    const [creating, setCreating] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [hasUnread, setHasUnread] = useState(true);
    const [toast, setToast] = useState(null);
    const tabRefs = useRef({});

    useEffect(() => {
        if (!toast) return undefined;
        const timer = setTimeout(() => setToast(null), 2600);
        return () => clearTimeout(timer);
    }, [toast]);

    const profileUrl = `${window.location.origin}/@${profile.username}`;
    const showToast = (text) => setToast({ text, id: newId("toast") });

    /* --- actions --- */

    async function handleShareProfile() {
        const shareData = {
            title: `${profile.name} on Platepeek`,
            text: `Check out ${profile.name}'s plates on Platepeek`,
            url: profileUrl,
        };
        if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
            try {
                await navigator.share(shareData);
                return;
            } catch (err) {
                if (err?.name === "AbortError") return;
            }
        }
        const ok = await copyText(profileUrl);
        showToast(ok ? "Profile link copied" : "Couldn't copy the link");
    }

    async function handleCopyPostLink(id) {
        const ok = await copyText(`${profileUrl}/plates/${id}`);
        showToast(ok ? "Link copied" : "Couldn't copy the link");
    }

    function toggleInSet(setter, id) {
        setter((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }

    function toggleSaved(id) {
        const wasSaved = savedIds.has(id);
        toggleInSet(setSavedIds, id);
        showToast(wasSaved ? "Removed from saved" : "Saved");
    }

    function deletePost(post) {
        if (!window.confirm(`Delete "${post.dish}"? This can't be undone.`)) return;
        setPosts((prev) => prev.filter((p) => p.id !== post.id));
        setSavedIds((prev) => {
            const next = new Set(prev);
            next.delete(post.id);
            return next;
        });
        showToast("Plate deleted");
    }

    function createPost(data) {
        const post = { id: newId("p"), likes: 0, comments: 0, ...data };
        setPosts((prev) => [post, ...prev]);
        setCreating(false);
        setActiveTab("posts");
        showToast("Plate shared");
    }

    function commentsOf(item) {
        return [...(item.comments > 0 ? sampleCommentsFor(item.id) : []), ...(addedComments[item.id] || [])];
    }

    function addComment(id, text) {
        setAddedComments((prev) => ({
            ...prev,
            [id]: [...(prev[id] || []), { id: newId(id), author: profile.username, text }],
        }));
    }

    function handleNavigate(key) {
        if (key === "home") onBackToHome();
        else if (key === "discover") showToast("Discover is coming soon");
        else if (key === "create") setCreating(true);
        else if (key === "plates") setActiveTab("posts");
        else if (key === "saved") setActiveTab("saved");
        else if (key === "notifications") {
            setNotifOpen((v) => !v);
            setHasUnread(false);
        }
    }

    function handleTabKeyDown(e, index) {
        let next = null;
        if (e.key === "ArrowRight") next = (index + 1) % TABS.length;
        if (e.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
        if (e.key === "Home") next = 0;
        if (e.key === "End") next = TABS.length - 1;
        if (next === null) return;
        e.preventDefault();
        setActiveTab(TABS[next].key);
        tabRefs.current[TABS[next].key]?.focus();
    }

    /* --- shape posts / reviews into cards --- */

    function postToCard(post) {
        return {
            id: post.id,
            image: post.image,
            tag: post.restaurant,
            title: post.dish,
            meta: [post.author ? `@${post.author}` : null, post.restaurant, post.location],
            text: post.caption,
            rating: post.rating,
            likes: post.likes,
            comments: post.comments,
        };
    }

    function reviewToCard(review) {
        return {
            id: review.id,
            image: review.image,
            tag: review.location,
            title: review.restaurant,
            meta: [review.location, `Visited ${review.visited}`],
            text: review.text,
            rating: review.rating,
            likes: review.likes,
            comments: review.comments,
        };
    }

    function renderCard(card, menuItems) {
        const comments = card.comments + (addedComments[card.id]?.length || 0);
        return (
            <FoodCard
                key={card.id}
                item={card}
                liked={likedIds.has(card.id)}
                commentCount={comments}
                onLike={() => toggleInSet(setLikedIds, card.id)}
                onComment={() => setCommentsFor(card)}
                menuItems={menuItems}
            />
        );
    }

    function postMenu(post, isOwn) {
        const saved = savedIds.has(post.id);
        const items = [
            { label: saved ? "Remove from saved" : "Save plate", icon: saved ? "bookmarkFilled" : "bookmark", onSelect: () => toggleSaved(post.id) },
            { label: "Copy link", icon: "link", onSelect: () => handleCopyPostLink(post.id) },
        ];
        if (isOwn) items.push({ label: "Delete plate", icon: "trash", danger: true, onSelect: () => deletePost(post) });
        return items;
    }

    const savedPosts = [...posts, ...SAMPLE_SAVED_FROM_OTHERS].filter((p) => savedIds.has(p.id));
    const ownIds = new Set(posts.map((p) => p.id));

    let panel;
    if (activeTab === "posts") {
        panel = posts.length ? (
            <div className="pf-grid">{posts.map((p) => renderCard(postToCard(p), postMenu(p, true)))}</div>
        ) : (
            <EmptyState text="No plates yet." action="Share your first plate" onAction={() => setCreating(true)} />
        );
    } else if (activeTab === "reviews") {
        panel = (
            <div className="pf-grid">
                {SAMPLE_REVIEWS.map((r) =>
                    renderCard(reviewToCard(r), [
                        { label: "Copy link", icon: "link", onSelect: () => handleCopyPostLink(r.id) },
                    ]),
                )}
            </div>
        );
    } else {
        panel = savedPosts.length ? (
            <div className="pf-grid">{savedPosts.map((p) => renderCard(postToCard(p), postMenu(p, ownIds.has(p.id))))}</div>
        ) : (
            <EmptyState text="Nothing saved yet. Tap ••• on any plate to save it for later." />
        );
    }

    const stats = [
        { icon: "plate", value: posts.length, label: profile.isHost ? "Dishes shared" : "Plates shared" },
        { icon: "users", value: profile.following, label: "Foodies following" },
        { icon: "user", value: profile.followers, label: "Foodie followers" },
    ];

    const sidebarKey = notifOpen ? "notifications" : activeTab === "posts" ? "plates" : activeTab === "saved" ? "saved" : null;

    return (
        <div className="pf-page">
            <Sidebar
                profile={profile}
                profileImage={account.profileImage}
                activeKey={sidebarKey}
                hasUnread={hasUnread}
                notifOpen={notifOpen}
                onCloseNotifications={() => setNotifOpen(false)}
                onNavigate={handleNavigate}
                onEdit={onEdit}
                onLogout={onLogout}
            />

            <main className="pf-main">
                {/* HEADER */}
                <section className="pf-header" aria-label="Profile">
                    <Avatar image={account.profileImage} initials={profile.initials} name={profile.name} className="pf-avatar-lg" />

                    <div className="pf-header-info">
                        <h1>
                            {profile.name}
                            {profile.verified && (
                                <span className="pf-verified" title="Verified" aria-label="Verified">
                                    <Icon name="verified" size={22} />
                                </span>
                            )}
                        </h1>
                        <p className="pf-username">@{profile.username}</p>
                        {profile.bio ? (
                            <p className="pf-bio">{profile.bio}</p>
                        ) : (
                            <p className="pf-bio pf-bio-empty">
                                {profile.isHost ? "Tell diners what makes your shop special." : "Add a short bio so people know what you love to eat."}
                            </p>
                        )}
                        <ul className="pf-details">
                            {profile.category && <li><Icon name="utensils" size={18} />{profile.category}</li>}
                            {profile.location && <li><Icon name="pin" size={18} />{profile.location}</li>}
                            {profile.memberSince && <li><Icon name="calendar" size={18} />Member since {profile.memberSince}</li>}
                        </ul>
                    </div>

                    <div className="pf-header-actions">
                        <IconButton icon="pen" label="Edit profile" onClick={onEdit} />
                        <IconButton icon="share" label="Share profile" onClick={handleShareProfile} />
                    </div>
                </section>

                {/* STATS */}
                <section className="pf-stats" aria-label="Profile statistics">
                    {stats.map((s) => (
                        <div key={s.label} className="pf-stat">
                            <Icon name={s.icon} size={34} strokeWidth={1.5} className="pf-stat-icon" />
                            <div>
                                <strong>{formatCount(s.value)}</strong>
                                <span>{s.label}</span>
                            </div>
                        </div>
                    ))}
                </section>

                {/* FAVOURITE CUISINES */}
                <section className="pf-cuisines" aria-labelledby="pf-cuisines-title">
                    <h2 id="pf-cuisines-title">Favourite cuisines</h2>
                    <ul>
                        {profile.cuisines.map((name) => (
                            <li key={name} className="pf-pill">
                                <span aria-hidden="true">{CUISINES.find((c) => c.key === name)?.icon || "🍽️"}</span>
                                {name}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* TABS */}
                <div className="pf-tabs" role="tablist" aria-label="Profile content">
                    {TABS.map((tab, i) => (
                        <button
                            key={tab.key}
                            ref={(el) => { tabRefs.current[tab.key] = el; }}
                            type="button"
                            role="tab"
                            id={`pf-tab-${tab.key}`}
                            aria-selected={activeTab === tab.key}
                            aria-controls="pf-tabpanel"
                            tabIndex={activeTab === tab.key ? 0 : -1}
                            className={`pf-tab ${activeTab === tab.key ? "pf-tab-active" : ""}`}
                            onClick={() => setActiveTab(tab.key)}
                            onKeyDown={(e) => handleTabKeyDown(e, i)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <section id="pf-tabpanel" role="tabpanel" aria-labelledby={`pf-tab-${activeTab}`} className="pf-tabpanel">
                    {panel}
                </section>
            </main>

            {commentsFor && (
                <CommentsDialog
                    item={commentsFor}
                    comments={commentsOf(commentsFor)}
                    onAdd={(text) => addComment(commentsFor.id, text)}
                    onClose={() => setCommentsFor(null)}
                />
            )}

            {creating && <CreatePlateDialog onCreate={createPost} onClose={() => setCreating(false)} />}

            <div className="pf-toast-region" aria-live="polite">
                {toast && <div key={toast.id} className="pf-toast">{toast.text}</div>}
            </div>
        </div>
    );
}

function EmptyState({ text, action, onAction }) {
    return (
        <div className="pf-empty">
            <p>{text}</p>
            {action && (
                <button type="button" className="pf-primary-btn" onClick={onAction}>
                    {action}
                </button>
            )}
        </div>
    );
}

/* ---------- EDIT PROFILE PAGE (split layout like Login / Register) ---------- */

function EditProfile({ account, onBackToHome, onCancel, onSave }) {
    const isHost = account.role === "host";
    const [previewImage, setPreviewImage] = useState(account.profileImage || "");
    const [cuisines, setCuisines] = useState(account.cuisines || DEFAULT_CUISINES);

    const currentName = isHost ? account.shopName || "My Shop" : account.fullName || "New Foodie";
    const initial = getInitials(currentName);

    function handleImageChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
    }

    function toggleCuisine(name) {
        setCuisines((prev) => (prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]));
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
                cuisines,
                profileImage: previewImage,
            });
        } else {
            onSave({
                fullName: text("fullName") || account.fullName,
                username: text("username").replace(/^@+/, "") || account.username,
                location: text("location"),
                email: text("email"),
                bio: text("bio"),
                cuisines,
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

                                <label htmlFor="location">Location</label>
                                <input id="location" name="location" type="text" defaultValue={account.location || ""} maxLength="40" placeholder="Colombo, Sri Lanka" />
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
                            placeholder={isHost ? "Tell diners what makes your shop special..." : "Food lover • Trying new places • Big on local eats"}
                        />

                        <fieldset className="pf-cuisine-picker">
                            <legend>Favourite cuisines</legend>
                            {CUISINES.map((c) => (
                                <label key={c.key} className={`pf-cuisine-option ${cuisines.includes(c.key) ? "pf-cuisine-option-on" : ""}`}>
                                    <input type="checkbox" checked={cuisines.includes(c.key)} onChange={() => toggleCuisine(c.key)} />
                                    <span aria-hidden="true">{c.icon}</span>
                                    {c.key}
                                </label>
                            ))}
                        </fieldset>

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

    function toggleEditing(next) {
        setEditing(next);
        window.scrollTo(0, 0);
    }

    // The profile view stays mounted while editing so likes, saves and new plates are kept
    return (
        <>
            {editing && (
                <EditProfile
                    account={account}
                    onBackToHome={onBackToHome}
                    onCancel={() => toggleEditing(false)}
                    onSave={(changes) => {
                        onAccountUpdate(changes);
                        toggleEditing(false);
                    }}
                />
            )}
            <div hidden={editing}>
                <ProfileView
                    account={account}
                    onBackToHome={onBackToHome}
                    onLogout={onLogout}
                    onEdit={() => toggleEditing(true)}
                />
            </div>
        </>
    );
}

export default Profile;
