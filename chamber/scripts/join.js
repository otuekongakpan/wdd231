document.addEventListener("DOMContentLoaded", () => {
    const ts = document.getElementById("timestamp");
    ts.value = new Date().toISOString();

    const membership = [
        {
            member: "Non Profit Membership Level",
            star: 0,
            description: "Free membership option designed for nonprofits needing visibility and basic community access for 20000 NGN.",
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
            description: "Entry-level paid membership for small businesses wanting more engagement and exposure for 40000 NGN.",
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
            description: "Intermediate membership offering higher visibility and additional promotional opportunities for 80000 NGN.",
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
            description: "Top-tier membership with maximum exposure, premium placement, and exclusive business advantages for 120000 NGN.",
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

    function displayMembership() {
    const container = document.querySelector("#memberCard");
    const dialog = document.getElementById("memberDetails");
    container.innerHTML = ""; 

    membership.forEach(level => {
        const card = document.createElement("div");
        card.classList.add("memberCard", "fade-in");

        const title = document.createElement("h3");
        title.textContent = level.member;
        card.appendChild(title);

        const learnMoreBtn = document.createElement("button");
        learnMoreBtn.textContent = "Learn More";
        learnMoreBtn.addEventListener("click", () => {

            dialog.innerHTML = `
                <h2>${level.member}</h2>
                <p>${level.description}</p>
                <h3>Benefits:</h3>
                <ul>
                    ${level.benefits.map(b => `<li>${b}</li>`).join("")}
                </ul>
                <button id="closeDialog">Close</button>
            `;
            dialog.showModal();

            document.getElementById("closeDialog").addEventListener("click", () => {
                dialog.close();
            });
        });
        card.appendChild(learnMoreBtn);


        container.appendChild(card);
    });
}
    displayMembership();
});
