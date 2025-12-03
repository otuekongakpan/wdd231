
import interests from "../data/interests.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const cardGrid = document.getElementById("discover-cards");

    function displayInterests(interests) {
        cardGrid.innerHTML = ""; 

        interests.forEach(interest => {

            const card = document.createElement("div");
            card.classList.add("interest-card");

            const heading = document.createElement("h2");
            heading.classList.add("heading");
            heading.textContent = interest.name;

            const imageFig = document.createElement("figure");
            imageFig.classList.add("figure");

            const image = document.createElement("img");
            image.src = interest.image;
            image.alt = interest.name;

            imageFig.appendChild(image);

            const addressTag = document.createElement("address");
            addressTag.textContent = interest.address;

            const desc = document.createElement("p");
            desc.textContent = interest.description;

            const btn = document.createElement("button");
            btn.textContent = "Learn More";

            card.append(heading, imageFig, addressTag, desc, btn);

            cardGrid.appendChild(card);
        });
    }

    displayInterests(interests);
});
