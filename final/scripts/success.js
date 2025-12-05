const detailsDiv = document.getElementById('reservation-details');
const params = new URLSearchParams(window.location.search);

if (!params.toString()) {
    detailsDiv.innerHTML = '<p>No reservation details found.</p>';
} else {
    const listItems = [];

    const labels = {
        rtype: "Reservation Type",
        fname: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        "res-date": "Reservation Date",
        "res-time": "Reservation Time",
        guests: "Number of Guests",
        requests: "Special Requests"
    };

    params.forEach((value, key) => {
        let label = labels[key] || key;

        // Format date
        if (key === 'res-date') {
            value = new Date(value).toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
        }

        // Format time
        if (key === 'res-time') {
            const [h, m] = value.split(':');
            const hour = ((+h + 11) % 12 + 1);
            const ampm = +h >= 12 ? 'PM' : 'AM';
            value = `${hour}:${m} ${ampm}`;
        }

        listItems.push(`<li class="${key}"><strong>${label}:</strong> ${value}</li>`);
    });

    detailsDiv.innerHTML = `<h3>Your Reservation Details:</h3><ul>${listItems.join('')}</ul>`;
}
