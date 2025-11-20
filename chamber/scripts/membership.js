document.addEventListener("DOMContentLoaded", () => {

    const memberLevels = [
        { value: "np", label: "Non Profit Membership" },
        { value: "bronze", label: "Bronze Membership" },
        { value: "silver", label: "Silver Membership" },
        { value: "gold", label: "Gold Membership" }
    ];

    const membershipSelect = document.getElementById("membership");

    memberLevels.forEach(level => {
        const opt = membershipSelect.querySelector(`option[value="${level.value}"]`);
        if (opt) opt.textContent = level.label;
    });

});
