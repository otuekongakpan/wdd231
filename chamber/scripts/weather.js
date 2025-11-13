const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=6.6137&lon=3.3792057&appid=ffd205a7c65491d70b06e933b02f1bac&units=imperial";

async function apiFetch() {
  try {
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

function convertUnixTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function displayResults(data) {
  const currentTemp = document.querySelector('#currentTemp');

  const weatherIcon = document.querySelector('#weather-icon');
  const captionDesc = document.querySelector('#captionDesc');
  const high = document.querySelector('#high');
  const low = document.querySelector('#low');
  const humidity = document.querySelector('#humidity');
  const sunrise = document.querySelector('#sunrise');
  const sunset = document.querySelector('#sunset');

  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const desc = data.weather[0].description;

  currentTemp.innerHTML = data.main.temp.toFixed(0);
 
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
  high.innerHTML = data.main.temp_max.toFixed(0);
  low.innerHTML = data.main.temp_min.toFixed(0);
  humidity.innerHTML = data.main.humidity;
  sunrise.innerHTML = convertUnixTime(data.sys.sunrise);
  sunset.innerHTML = convertUnixTime(data.sys.sunset);
}
