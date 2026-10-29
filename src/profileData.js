/* Sample profile content (replace with real data when you add a backend).
   Everything the profile page shows comes from here or from the account
   object in App.jsx, so swapping in an API later only touches this file. */

import pasta from "./assets/pasta.png";
import pasta2 from "./assets/pasta2.png";
import pizza from "./assets/pizza.png";
import sushi from "./assets/sushi.png";

export const CUISINES = [
    { key: "Asian", icon: "🍜" },
    { key: "Italian", icon: "🍕" },
    { key: "Sri Lankan", icon: "🍃" },
    { key: "Street Food", icon: "🍢" },
    { key: "Desserts", icon: "🍰" },
    { key: "Seafood", icon: "🦐" },
    { key: "Indian", icon: "🍛" },
    { key: "Mexican", icon: "🌮" },
    { key: "Japanese", icon: "🍣" },
    { key: "Cafe & Brunch", icon: "☕" },
];

export const DEFAULT_CUISINES = ["Asian", "Italian", "Sri Lankan", "Street Food", "Desserts"];

export const DEFAULT_FALLBACK_IMAGE = pasta2;

const SAMPLE_COMMENTS = [
    { id: "c1", author: "kavi.eats", text: "Adding this to my list!" },
    { id: "c2", author: "spoonandsoy", text: "That looks unreal 😍" },
];

/* Posts shared by the signed-in user */
export const SAMPLE_POSTS = [
    {
        id: "p1",
        dish: "Creamy mushroom pasta",
        restaurant: "The Pasta House",
        location: "Colombo 3",
        image: pasta,
        likes: 124,
        comments: 12,
        caption: "Super creamy and well seasoned.",
        rating: 9,
    },
    {
        id: "p2",
        dish: "Pepperoni pizza",
        restaurant: "Pizzaiolo",
        location: "Colombo 4",
        image: pizza,
        likes: 98,
        comments: 6,
        caption: "Thin crust, lots of flavour. Perfect for a chill night.",
        rating: 9,
    },
    {
        id: "p3",
        dish: "Salmon sushi platter",
        restaurant: "Sōma Sushi",
        location: "Colombo 3",
        image: sushi,
        likes: 156,
        comments: 18,
        caption: "Fresh and high quality. My favourite sushi spot in Colombo!",
        rating: 10,
    },
    {
        id: "p4",
        dish: "Bacon tagliatelle",
        restaurant: "Nonna's Kitchen",
        location: "Colombo 5",
        image: pasta2,
        likes: 102,
        comments: 9,
        caption: "Simple but really good. The pasta was perfectly al dente.",
        rating: 8,
    },
    {
        id: "p5",
        dish: "Chef's maki selection",
        restaurant: "Kyo Café",
        location: "Colombo 3",
        image: sushi,
        likes: 76,
        comments: 5,
        caption: "Light and not too heavy.",
        rating: 8,
    },
    {
        id: "p6",
        dish: "Spicy salami pizza",
        restaurant: "Slice Club",
        location: "Colombo 7",
        image: pizza,
        likes: 88,
        comments: 7,
        caption: "A bit pricey but so worth it. Crispy edges and a proper chilli kick.",
        rating: 9,
    },
];

/* Posts by other foodies that the signed-in user has reposted to their Cravings */
export const SAMPLE_CRAVINGS_FROM_OTHERS = [
    {
        id: "s1",
        author: "colombo.bites",
        dish: "Truffle carbonara",
        restaurant: "Trattoria Uno",
        location: "Colombo 7",
        image: pasta2,
        likes: 214,
        comments: 23,
        caption: "Rich, silky and worth every bite. Ask for extra parmesan.",
        rating: 9,
    },
    {
        id: "s2",
        author: "thesushidiaries",
        dish: "Rainbow roll",
        restaurant: "Umi",
        location: "Colombo 2",
        image: sushi,
        likes: 187,
        comments: 15,
        caption: "Colourful, fresh and beautifully plated.",
        rating: 9,
    },
];

export const INITIAL_CRAVING_IDS = ["s1", "s2"];

export function sampleCommentsFor(postId) {
    return SAMPLE_COMMENTS.map((c) => ({ ...c, id: `${postId}-${c.id}` }));
}

export const SAMPLE_NOTIFICATIONS = [
    { id: "n1", text: "kavi.eats liked your Salmon sushi platter", time: "2h" },
    { id: "n2", text: "colombo.bites started following you", time: "5h" },
    { id: "n3", text: "spoonandsoy commented on Creamy mushroom pasta", time: "1d" },
];
