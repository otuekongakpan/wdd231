document.addEventListener("DOMContentLoaded", () => {
  const spotlightGrid = document.getElementById("spotlightGrid");
  const spotlightJSON = "data/members.json";  
  const gridBtn = document.createElement("button");
  const listBtn = document.createElement("button");
  gridBtn.textContent = "Grid View";
  listBtn.textContent = "List View";

  const spotlightSection = document.querySelector(".spotlight");
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("view-toggle");
  toggleContainer.appendChild(gridBtn);
  toggleContainer.appendChild(listBtn);

  spotlightSection.insertBefore(toggleContainer, spotlightGrid);

  async function getSpotlight() {
    try {
      const response = await fetch(spotlightJSON);  
      if (!response.ok) throw new Error("Failed to load member data");
      const data = await response.json();

      const eligibleMembers = data.companies.filter(member =>
        member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
      );

      const spotlightMembers = getRandomMembers(eligibleMembers, 3);

      displaySpotlight(spotlightMembers);
    } catch (error) {
      console.error("Error fetching member data:", error);
      spotlightGrid.innerHTML = "<p>Unable to load member data.</p>";
    }
  }

  function getRandomMembers(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  function displaySpotlight(spotlight) {
    spotlightGrid.innerHTML = "";

    spotlight.forEach(member => {
      const card = document.createElement("article");
      card.classList.add("spotlight-card");

      const imgWrap = document.createElement("div");
      imgWrap.classList.add("spotlight-logo-wrap");

      const logo = document.createElement("img");
      logo.src = member.image;
      logo.alt = `${member.companyName} logo`;
      imgWrap.appendChild(logo);
      card.appendChild(imgWrap);

      const content = document.createElement("div");
      content.classList.add("member-content");

      const name = document.createElement("h3");
      name.textContent = member.companyName;
      content.appendChild(name);

      const membership = document.createElement("p");
      membership.textContent = `Membership: ${member.membershipLevel}`;
      content.appendChild(membership);

      const address = document.createElement("p");
      address.textContent = member.address;
      content.appendChild(address);

      const phone = document.createElement("p");
      phone.textContent = member.phoneNumber;
      content.appendChild(phone);

      const website = document.createElement("a");
      website.href = member.url;
      website.textContent = "Visit Website";
      website.target = "_blank"; 
      content.appendChild(website);

      card.appendChild(content);
      spotlightGrid.appendChild(card);
    });
  }

  gridBtn.addEventListener("click", () => {
    spotlightGrid.classList.add("grid-view");
    spotlightGrid.classList.remove("list-view");
  });

  listBtn.addEventListener("click", () => {
    spotlightGrid.classList.add("list-view");
    spotlightGrid.classList.remove("grid-view");
  });

  spotlightGrid.classList.add("grid-view");
  getSpotlight();
});
