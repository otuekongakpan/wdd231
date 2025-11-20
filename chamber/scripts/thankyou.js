const params = new URLSearchParams(window.location.search);

document.getElementById("firstName").textContent = params.get("fname");
document.getElementById("lastName").textContent = params.get("lname");
document.getElementById("email").textContent = params.get("email");
document.getElementById("mobile").textContent = params.get("phonenumber");
document.getElementById("business").textContent = params.get("business-name");
document.getElementById("timestamp").textContent = params.get("timestamp");
