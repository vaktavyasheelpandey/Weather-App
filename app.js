// API key and base URL for the OpenWeatherMap API
const apiKey = '1ca5cea71f21b50fd6552767a182b042';  // Replace with your OpenWeatherMap API Key
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('getWeather').addEventListener('click', function () {
  const city = document.getElementById('cityInput').value;
  if (city) {
    getWeatherData(city);
  } else {
    alert('Please enter a city');
  }
});

function getWeatherData(city) {
  // Show loading spinner
  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('weatherInfo').classList.add('hidden');

  fetch(`${apiBaseUrl}?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(err => console.error('Error fetching weather data:', err))
    .finally(() => {
      // Hide loading spinner
      document.getElementById('loading').classList.add('hidden');
    });
}

function displayWeather(data) {
  if (data.cod === 200) {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('temperature').textContent = `${data.main.temp}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidityValue').textContent = data.main.humidity;
    document.getElementById('windValue').textContent = data.wind.speed;

    // Show weather information
    document.getElementById('weatherInfo').classList.remove('hidden');
  } else {
    alert('City not found. Please try again.');
  }
}
