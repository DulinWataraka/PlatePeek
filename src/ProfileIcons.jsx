/* Line icons used by the profile page (24px grid, stroke = currentColor) */

const PATHS = {
    home: (
        <>
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
        </>
    ),
    compass: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="m15.5 8.5-2 5-5 2 2-5z" />
        </>
    ),
    plus: <path d="M12 4v16M4 12h16" />,
    utensils: (
        <>
            <path d="m4 4 16 16" />
            <path d="M7.5 3.5 4 7c-.8.8-.8 2 0 2.8l1.2 1.2c.8.8 2 .8 2.8 0L11.5 7.5" />
            <path d="M20 4 9 15" />
            <path d="m4 20 5-5" />
            <path d="M15 4c2-1 4 1 3 3l-3 3" />
        </>
    ),
    bookmark: <path d="M6 3h12v18l-6-4.5L6 21z" />,
    bookmarkFilled: <path d="M6 3h12v18l-6-4.5L6 21z" fill="currentColor" />,
    bell: (
        <>
            <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z" />
            <path d="M10 21h4" />
        </>
    ),
    chevronRight: <path d="m9 6 6 6-6 6" />,
    pen: (
        <>
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />
            <path d="m14.5 5.5 3 3" />
        </>
    ),
    share: (
        <>
            <circle cx="18" cy="5" r="2.5" />
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="19" r="2.5" />
            <path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" />
        </>
    ),
    pin: (
        <>
            <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.5" />
        </>
    ),
    calendar: (
        <>
            <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
            <path d="M3.5 10h17M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
        </>
    ),
    plate: (
        <>
            <circle cx="12" cy="12" r="5.5" />
            <circle cx="12" cy="12" r="2.5" />
            <path d="M3 4v4a2 2 0 0 0 2 2v10M5 4v4M7 4v4a2 2 0 0 1-2 2" />
            <path d="M20 20V4c-1.5 1-2 3-2 6h2" />
        </>
    ),
    users: (
        <>
            <circle cx="9" cy="8" r="3.5" />
            <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
            <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3c2.1.8 3.5 2.8 3.5 5.7" />
        </>
    ),
    user: (
        <>
            <circle cx="12" cy="8" r="4" />
            <path d="M4.5 21c0-4.1 3.4-7 7.5-7s7.5 2.9 7.5 7" />
        </>
    ),
    heart: <path d="M12 20s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.2-8 11-8 11z" />,
    heartFilled: (
        <path
            d="M12 20s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.2-8 11-8 11z"
            fill="currentColor"
        />
    ),
    comment: <path d="M4 12a8 8 0 1 1 3.6 6.7L4 20l1.2-3.4A8 8 0 0 1 4 12z" />,
    more: (
        <>
            <circle cx="5" cy="12" r="1.3" fill="currentColor" />
            <circle cx="12" cy="12" r="1.3" fill="currentColor" />
            <circle cx="19" cy="12" r="1.3" fill="currentColor" />
        </>
    ),
    verified: (
        <>
            <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" />
            <path d="m7.5 12.2 3 3 6-6.2" stroke="#fff" strokeWidth="2.2" />
        </>
    ),
    sparkle: (
        <>
            <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z" />
            <path d="M18.5 15.5c.3 1.7 1 2.4 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.1 2.2-.8 2.5-2.5z" />
        </>
    ),
    star: <path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" />,
    link: (
        <>
            <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" />
            <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
        </>
    ),
    trash: (
        <>
            <path d="M4 7h16M10 11v6M14 11v6M9 7V4h6v3" />
            <path d="M6 7l1 13h10l1-13" />
        </>
    ),
    close: <path d="M6 6l12 12M18 6 6 18" />,
    logout: (
        <>
            <path d="M15 4h4v16h-4" />
            <path d="M10 8l-4 4 4 4M6 12h10" />
        </>
    ),
    repost: (
        <>
            <path d="M17 2.5 20.5 6 17 9.5" />
            <path d="M3.5 11V10a4 4 0 0 1 4-4h13" />
            <path d="M7 21.5 3.5 18 7 14.5" />
            <path d="M20.5 13v1a4 4 0 0 1-4 4h-13" />
        </>
    ),
    settings: (
        <>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" />
        </>
    ),
    activity: <path d="M3 12h4l2.5-7 5 14 2.5-7h4" />,
    image: (
        <>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="10" r="2" />
            <path d="m21 16-5-5-9 9" />
        </>
    ),
};

function Icon({ name, size = 22, strokeWidth = 1.7, className }) {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            {PATHS[name]}
        </svg>
    );
}

export default Icon;
