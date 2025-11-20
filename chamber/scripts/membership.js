const memberLevels = [
  { value: "np",    name: "Non Profit Membership" },
  { value: "bronze", name: "Bronze Membership" },
  { value: "silver", name: "Silver Membership" },
  { value: "gold",   name: "Gold Membership" }
];

const membershipSelect = document.getElementById("membership");


membershipSelect.innerHTML = "";

const placeholder = document.createElement("option");
placeholder.value = "";
placeholder.textContent = "Select a Level";
membershipSelect.appendChild(placeholder);

memberLevels.forEach(level => {
  const option = document.createElement("option");
  option.value = level.value;   
  option.textContent = level.name;
  membershipSelect.appendChild(option);
});
