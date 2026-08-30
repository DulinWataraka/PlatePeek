import "./Homepage.css";

function Homepage() {
    return (
        <div className="app">
            <header className="navbar">
                <div className="logo">
                    <span className="logo-icon">🍴</span>
                    <span>plate peek</span>
                </div>

                <nav>
                    <button className="login-button">Log in</button>
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

                <div className="food-area">
                    <div className="food-card card-one">
                        🍜
                    </div>

                    <div className="food-card card-two">
                        🍕
                    </div>

                    <div className="food-card card-three">
                        🥗
                    </div>

                    <div className="food-card card-four">
                        🍰
                    </div>

                    <div className="plate">
                        🍽️
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
        </div>
    );
}

export default Homepage;
