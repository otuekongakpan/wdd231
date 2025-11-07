const memberGrid = document.getElementById("memberGrid");
const jsonURL = "data/members.json"; 

const gridBtn = document.createElement("button");
const listBtn = document.createElement("button");
gridBtn.textContent = "Grid View";
listBtn.textContent = "List View";

const membersSection = document.querySelector(".members");
const toggleContainer = document.createElement("div");
toggleContainer.classList.add("view-toggle");
toggleContainer.appendChild(gridBtn);
toggleContainer.appendChild(listBtn);
membersSection.insertBefore(toggleContainer, memberGrid);

async function getMembers() {
  try {
    const response = await fetch(jsonURL);
    if (!response.ok) throw new Error("Failed to load member data");
    const data = await response.json();
    displayMembers(data.companies);
  } catch (error) {
    console.error("Error fetching member data:", error);
    memberGrid.innerHTML = "<p>Unable to load member data.</p>";
  }
}

function displayMembers(members) {
  memberGrid.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    const imgWrap = document.createElement("div");
    imgWrap.classList.add("member-logo-wrap");

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
    memberGrid.appendChild(card);
  });
}

gridBtn.addEventListener("click", () => {
  memberGrid.classList.add("grid-view");
  memberGrid.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
  memberGrid.classList.add("list-view");
  memberGrid.classList.remove("grid-view");
});

memberGrid.classList.add("grid-view");

getMembers();
