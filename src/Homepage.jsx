import "./Homepage.css";
import pastaImg from "./assets/pasta.png";
import pasta2Img from "./assets/pasta2.png";
import pizzaImg from "./assets/pizza.png";
import sushiImg from "./assets/sushi.png";

function Homepage({ onLoginClick }) {
    return (
        <div className="app">
            <header className="navbar">
                <div className="logo">
                    <span className="logo-icon">🍴</span>
                    <span>plate peek</span>
                </div>

                <nav>
                    <button className="login-button" onClick={onLoginClick}>Log in</button>
                    <button className="join-button">
                        Join the table <span>→</span>
                    </button>
                </nav>
            </header>

            <main className="hero">
                <div className="hero-content">
                    <div className="eyebrow">
                        ✨ FOOD PEOPLE, FOUND HERE
                    </div>

                    <h1>
                        Your next
                        <span> favorite </span>
                        bite starts here.
                    </h1>

                    <p>
                        Share what you ate, discover where to go next,
                        and turn every meal into a little story.
                    </p>

                    <div className="hero-buttons">
                        <button className="primary-button">
                            Start peeking <span>→</span>
                        </button>

                        <button className="secondary-button">
                            See how it works
                        </button>
                    </div>
                </div>

                <div className="hero-photos">
                    <img src={pastaImg} alt="Creamy carbonara pasta" className="hero-photo photo-back" />
                    <img src={pasta2Img} alt="Crispy fried rice with spring onion" className="hero-photo photo-front" />
                    <div className="streak-badge">
                        <span className="streak-icon">🔥</span>
                        <span>7 day<br />streak</span>
                    </div>
                </div>
            </main>

            <div className="community">
                <div className="avatars">
                    <span>MP</span>
                    <span>NW</span>
                    <span>SC</span>
                    <span>TJ</span>
                </div>

                <div>
                    <strong>12,400+ food people</strong>
                    <p>are already saving a seat</p>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <section className="how-it-works">
                <div className="section-heading">
                    <span className="section-tag">THREE WAYS IN</span>
                    <h2>
                        Eat something good.
                        <br />
                        Leave a breadcrumb.
                    </h2>
                </div>

                <div className="steps-grid">
                    <div className="step-card">
                        <span className="step-number">01</span>
                        <h3>Share the plate</h3>
                        <p>
                            Post the dish you are still thinking about.
                            Context makes it taste better.
                        </p>
                        <div className="step-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="3" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="M21 15l-5-5L5 21" />
                            </svg>
                        </div>
                    </div>

                    <div className="step-card">
                        <span className="step-number">02</span>
                        <h3>Follow the flavor</h3>
                        <p>
                            Find hidden gems, curious cooks, and people
                            who order like you do.
                        </p>
                        <div className="step-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                            </svg>
                        </div>
                    </div>

                    <div className="step-card">
                        <span className="step-number">03</span>
                        <h3>Play for the next bite</h3>
                        <p>
                            Complete food quests, collect XP, and keep a
                            streak worth talking about.
                        </p>
                        <div className="step-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M8 21h8" />
                                <path d="M12 17v4" />
                                <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
                                <path d="M17 5h3a2 2 0 0 1-2 4" />
                                <path d="M7 5H4a2 2 0 0 0 2 4" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEED SHOWCASE */}
            <section className="feed-showcase">
                <div className="feed-copy">
                    <span className="section-tag">MADE FOR CURIOUS EATERS</span>
                    <h2>
                        Your feed,
                        <span> seasoned </span>
                        well.
                    </h2>
                    <p>
                        No engagement treadmill. Just real plates, useful
                        recommendations, and the occasional challenge to
                        leave your usual order.
                    </p>
                </div>

                <div className="feed-photos">
                    <img src={pizzaImg} alt="Fresh baked pizza" className="feed-photo photo-one" />
                    <img src={sushiImg} alt="Assorted sushi platter" className="feed-photo photo-two" />
                </div>
            </section>
        </div>
    );
}

export default Homepage;