const messageArea = document.querySelector("#visitor-message");

let lastVisit = localStorage.getItem("lastVisit");
let now = Date.now();

if (!lastVisit) {
    messageArea.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const daysBetween = Math.floor((now - lastVisit) / millisecondsInADay);

    if (daysBetween < 1) {
        messageArea.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
        messageArea.textContent = "You last visited 1 day ago.";
    } else {
        messageArea.textContent = `You last visited ${daysBetween} days ago.`;
    }
}