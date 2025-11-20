const memberLevels = [
  {
    name: "Non Profit Membership",
    averagerating: 0
  },
  {
    name: "Bronze Membership",
    averagerating: 1
  },
  {
    name: "Silver Membership",
    averagerating: 2
  },
  {
    name: "Gold Membership",
    averagerating: 3
  }
];

const membershipSelect = document.getElementById("membership");


memberLevels.forEach(level => {
  const option = document.createElement("option");
  option.textContent = level.name;
  option.value = level.name;   
  membershipSelect.appendChild(option);
});
