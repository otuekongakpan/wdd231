const currentWeather = document.querySelector('#currentWeather');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const weatherDescription = document.querySelector('#weatherDescription')
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat={6.5243793}&lon={3.3792057}&appid=ffd205a7c65491d70b06e933b02f1bac&units=imperial";

async function apiFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);

  }
}
apiFetch();
