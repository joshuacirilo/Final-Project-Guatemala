const url = './data/places.json';
const cards = document.querySelector('#cards');
const weatherDialog = document.querySelector('#weatherDialog');
const closeDialog = document.querySelector('#closeDialog');

const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');
const myForecast = document.querySelector('#forecast');

const apiKey = '959123c2bdceef89b42a24a8c0891292'; 


async function getPlacesData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayPlaces(data.places);
  } catch (error) {
    console.error('Error loading places data:', error);
  }
}

getPlacesData();


function displayPlaces(places) {
  places.forEach((place) => {
    const card = document.createElement('section');
    const name = document.createElement('h2');
    const description = document.createElement('p');
    const location = document.createElement('p');
    const image = document.createElement('img');
    const weatherBtn = document.createElement('button');


    name.textContent = place.name;
    description.textContent = place.description;
    location.textContent = `📍 ${place.location}`;
    weatherBtn.textContent = 'Weather';


    image.src = place.image_url;
    image.alt = `Image of ${place.name}`;
    image.loading = 'lazy';


    card.classList.add('place-card');
    weatherBtn.classList.add('weather-btn');


    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(location);
    card.appendChild(weatherBtn);
    cards.appendChild(card);


    weatherBtn.addEventListener('click', () => {
      showWeatherDialog(place);
    });
  });
}


async function showWeatherDialog(place) {
  const { latitude, longitude } = place.coordinates;
  

  const url_weather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  const url_forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(url_weather),
      fetch(url_forecast)
    ]);

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();


    displayResults(place, weatherData);
    displayForecast(forecastData);


    weatherDialog.showModal();

  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}


function displayResults(place, data) {
  myTown.textContent = place.name;
  myDescription.textContent = data.weather[0].description;
  myTemperature.innerHTML = `${data.main.temp.toFixed(1)}&deg;C`;

  const iconCode = data.weather[0].icon;
  const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  myGraphic.src = iconSrc;
  myGraphic.alt = data.weather[0].description;
}


function displayForecast(data) {
  myForecast.innerHTML = "";


  const dailyData = data.list
    .filter(item => item.dt_txt.includes("12:00:00"))
    .slice(0, 3);

  dailyData.forEach((day, index) => {
    const date = new Date(day.dt_txt);
    const dayName = index === 0 ? "Today" :
                    index === 1 ? "Tomorrow" : 
                    date.toLocaleDateString('en-EN', { weekday: 'long' });

    const temp = `${day.main.temp.toFixed(1)}°C`;
    const iconCode = day.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const card = document.createElement('div');
    card.classList.add('forecast-day');
    card.innerHTML = `
      <h4>${dayName}</h4>
      <img src="${iconSrc}" alt="${day.weather[0].description}">
      <p>${temp}</p>
      <p>${day.weather[0].description}</p>
    `;
    myForecast.appendChild(card);
  });
}


closeDialog.addEventListener('click', () => {
  weatherDialog.close();
});
