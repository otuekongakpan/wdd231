


const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=6.6137&lon=3.3792057&appid=ffd205a7c65491d70b06e933b02f1bac&units=imperial`;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=6.6137&lon=3.3792057&appid=ffd205a7c65491d70b06e933b02f1bac&units=imperial`;

async function apiFetch() {
  try {
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }

    const forecastResponse = await fetch(forecastUrl);
    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      displayForecast(forecastData);
    } else {
      throw Error(await forecastResponse.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

function convertUnixTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function displayResults(data) {
  const currentTemp = document.querySelector("#currentTemp");
  const weatherDescription = document.querySelector("#weatherDescription");
  const weatherIcon = document.querySelector("#weather-icon");
  const captionDesc = document.querySelector("#captionDesc");
  const high = document.querySelector("#high");
  const low = document.querySelector("#low");
  const humidity = document.querySelector("#humidity");
  const sunrise = document.querySelector("#sunrise");
  const sunset = document.querySelector("#sunset");

  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const desc = data.weather[0].description;

  currentTemp.innerHTML = data.main.temp.toFixed(0);
  weatherDescription.textContent = desc;
  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", desc);
  captionDesc.textContent = desc;
  high.innerHTML = data.main.temp_max.toFixed(0);
  low.innerHTML = data.main.temp_min.toFixed(0);
  humidity.innerHTML = data.main.humidity;
  sunrise.innerHTML = convertUnixTime(data.sys.sunrise);
  sunset.innerHTML = convertUnixTime(data.sys.sunset);
}

function displayForecast(forecastData) {
  const todayForecast = document.querySelector("#todayForecast");
  const tomorrowForecast = document.querySelector("#tomorrowForecast");
  const dayAfterForecast = document.querySelector("#dayAfterForecast");

  const day1Label = document.querySelector("#day1");
  const day2Label = document.querySelector("#day2");
  const day3Label = document.querySelector("#day3");


  const now = new Date();
  const dayNames = [];
  for (let i = 0; i < 3; i++) {
    const nextDay = new Date(now);
    nextDay.setDate(now.getDate() + i);
    dayNames.push(nextDay.toLocaleDateString("en-US", { weekday: "long" }));
  }

  day1Label.textContent = "Today";
  day2Label.textContent = dayNames[1];
  day3Label.textContent = dayNames[2];


  const dailyTemps = {};
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    if (!dailyTemps[day]) dailyTemps[day] = [];
    dailyTemps[day].push(item.main.temp);
  });

  const averages = dayNames.map(day => {
    const temps = dailyTemps[day] || [];
    if (temps.length === 0) return "—";
    return (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(0);
  });

  todayForecast.textContent = averages[0];
  tomorrowForecast.textContent = averages[1];
  dayAfterForecast.textContent = averages[2];
}


