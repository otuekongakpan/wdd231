const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=6.6137&lon=3.3792057&appid=ffd205a7c65491d70b06e933b02f1bac&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=6.6137&lon=3.3792057&appid=ffd205a7c65491d70b06e933b02f1bac&units=imperial`;

async function apiFetch() {
    try {
        // Fetch today’s weather (for sunshine check)
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();
        checkOutdoorDining(weatherData);

        // Fetch forecast
        const res = await fetch(forecastUrl);
        const data = await res.json();
        displayForecast(data);
    } catch (err) {
        console.log(err);
    }
}

apiFetch();

// -----------------------------------------
// OUTDOOR DINING AVAILABILITY
// -----------------------------------------

function checkOutdoorDining(data) {
    const outdoorStatus = document.querySelector("#outdoorStatus");
    const desc = data.weather[0].description.toLowerCase();

    // Anything with sun or clear skies
    if (desc.includes("sun") || desc.includes("clear")) {
        outdoorStatus.textContent = "☀️ Outdoor dining is available today!";
        outdoorStatus.style.color = "green";
    } else {
        outdoorStatus.textContent = "🌥️ Outdoor dining is currently unavailable.";
        outdoorStatus.style.color = "red";
    }
}

// -----------------------------------------
// FORECAST
// -----------------------------------------

function displayForecast(forecastData) {

    const dayLabels = [
        document.querySelector("#day1"),
        document.querySelector("#day2"),
        document.querySelector("#day3")
    ];

    const tempSpans = [
        document.querySelector("#todayForecast"),
        document.querySelector("#tomorrowForecast"),
        document.querySelector("#dayAfterForecast")
    ];

    const forecastParagraphs = document.querySelectorAll(".weatherForecast p");

    // Get upcoming days
    const now = new Date();
    const days = [];

    for (let i = 0; i < 3; i++) {
        const d = new Date(now);
        d.setDate(now.getDate() + i);
        days.push(d.toLocaleDateString("en-US", { weekday: "long" }));
    }

    dayLabels[0].textContent = "Today";
    dayLabels[1].textContent = days[1];
    dayLabels[2].textContent = days[2];

    // Organize temps + icons
    const dailyTemps = {};
    const dailyIcons = {};

    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

        if (!dailyTemps[dayName]) dailyTemps[dayName] = [];
        dailyTemps[dayName].push(item.main.temp);

        if (!dailyIcons[dayName]) dailyIcons[dayName] = item.weather[0].icon;
    });

    // Display forecast
    days.forEach((day, i) => {
        const temps = dailyTemps[day] || [];

        tempSpans[i].textContent = temps.length
            ? (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(0)
            : "—";

        // Insert icon
        const icon = document.createElement("img");
        icon.src = `https://openweathermap.org/img/w/${dailyIcons[day]}.png`;
        icon.alt = "forecast icon";
        icon.width = 40;
        icon.height = 40;
        icon.style.verticalAlign = "middle";
        icon.style.marginRight = "5px";

        forecastParagraphs[i].insertBefore(icon, tempSpans[i]);
    });
}
