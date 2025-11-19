document.addEventListener("DOMContentLoaded", () => {
    const ts = document.getElementById("timestamp");
    ts.value = new Date().toISOString();

const membership = [
    {
        member: "Non Profit Membership Level",
        star: 0,
        description: "Free membership option designed for nonprofits needing visibility and basic community access.",
        benefits: [
            "Basic directory listing",
            "Access to newsletters",
            "Invitations to community meetings",
            "Access to public events"
        ]
    },

    {
        member: "Bronze Membership Level",
        star: 1,
        description: "Entry-level paid membership for small businesses wanting more engagement and exposure.",
        benefits: [
            "Standard directory listing",
            "1 social media spotlight per year",
            "Access to member-only events",
            "Discount on workshops and seminars"
        ]
    },

    {
        member: "Silver Membership Level",
        star: 2,
        description: "Intermediate membership offering higher visibility and additional promotional opportunities.",
        benefits: [
            "Enhanced directory listing with website link",
            "2 social media spotlights per year",
            "Discounted event fees",
            "Access to networking luncheons",
            "Priority booth placement at events"
        ]
    },

    {
        member: "Gold Membership Level",
        star: 3,
        description: "Top-tier membership with maximum exposure, premium placement, and exclusive business advantages.",
        benefits: [
            "Premium directory placement",
            "Monthly social media spotlights",
            "Free booth at major events",
            "Priority sponsorship opportunities",
            "Early access to chamber programs",
            "Featured member highlight on homepage"
        ]
    }
];

    
});