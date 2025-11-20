const params = new URLSearchParams(window.location.search);

document.getElementById("firstName").textContent = params.get("fname");
document.getElementById("lastName").textContent = params.get("lname");
document.getElementById("email").textContent = params.get("email");
document.getElementById("phone").textContent = params.get("phonenumber");
document.getElementById("businessName").textContent = params.get("business-name");
document.getElementById("timestamp").textContent = params.get("timestamp");
