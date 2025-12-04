const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=6.6137&lon=3.3792057&appid=ffd205a7c65491d70b06e933b02f1bac&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=6.6137&lon=3.3792057&appid=ffd205a7c65491d70b06e933b02f1bac&units=imperial`;

async function apiFetch() {
    try {
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();
        checkOutdoorDining(weatherData);

        const res = await fetch(forecastUrl);
        const data = await res.json();
        displayForecast(data);
    } catch (err) {
        console.log(err);
    }
}

apiFetch();


function checkOutdoorDining(data) {
    const outdoorStatus = document.querySelector("#outdoorStatus");
    const desc = data.weather[0].description.toLowerCase();

    if (desc.includes("sun") || desc.includes("clear")) {
        outdoorStatus.textContent = "☀️ Outdoor dining is available today!";
        outdoorStatus.style.color = "green";
    } else {
        outdoorStatus.textContent = "🌥️ Outdoor dining is currently unavailable.";
        outdoorStatus.style.color = "red";
    }
}

function displayForecast(forecastData) {

    // 5 days
    const dayLabels = [
        document.querySelector("#day1"),
        document.querySelector("#day2"),
        document.querySelector("#day3"),
        document.querySelector("#day4"),
        document.querySelector("#day5")
    ];

    const tempSpans = [
        document.querySelector("#forecast1"),
        document.querySelector("#forecast2"),
        document.querySelector("#forecast3"),
        document.querySelector("#forecast4"),
        document.querySelector("#forecast5")
    ];

    const forecastParagraphs = document.querySelectorAll(".weatherForecast p");

    // Get next 5 days
    const now = new Date();
    const days = [];

    for (let i = 0; i < 5; i++) {
        const d = new Date(now);
        d.setDate(now.getDate() + i);
        days.push(d.toLocaleDateString("en-US", { weekday: "long" }));
    }

    dayLabels.forEach((label, i) => {
        label.textContent = i === 0 ? "Today" : days[i];
    });

    // Temps + icons dictionary
    const dailyTemps = {};
    const dailyIcons = {};

    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

        if (!dailyTemps[dayName]) dailyTemps[dayName] = [];
        dailyTemps[dayName].push(item.main.temp);

        if (!dailyIcons[dayName]) dailyIcons[dayName] = item.weather[0].icon;
    });

    days.forEach((day, i) => {
        const temps = dailyTemps[day] || [];

        tempSpans[i].textContent = temps.length
            ? (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(0)
            : "—";

        // icon
        const icon = document.createElement("img");
        icon.src = `https://openweathermap.org/img/w/${dailyIcons[day]}.png`;
        icon.alt = "forecast icon";
        icon.width = 40;
        icon.height = 40;

        forecastParagraphs[i].insertBefore(icon, tempSpans[i]);
    });
}
