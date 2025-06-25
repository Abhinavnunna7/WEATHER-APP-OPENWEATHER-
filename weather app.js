const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherResult = document.getElementById("weather-result");
const errorMessage = document.getElementById("error-message");
const themeToggleBtn = document.getElementById("toggle-theme");

const API_KEY = "9d1826be36eebc9cee2e597af9ae7317"; // Replace this with your OpenWeatherMap API key

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city === "") return;

  weatherResult.classList.add("hide");
  errorMessage.classList.add("hide");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    updateWeather(data);
  } catch (error) {
    showError(error.message);
  }
});

function updateWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `🌡 Temperature: ${data.main.temp} °C`;
  description.textContent = `☁ Description: ${data.weather[0].description}`;
  humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
  wind.textContent = `🌬 Wind Speed: ${data.wind.speed} m/s`;

  weatherResult.classList.remove("hide");
}

function showError(message) {
  errorMessage.textContent = `❌ ${message}`;
  errorMessage.classList.remove("hide");
}

// Toggle dark/light mode
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeToggleBtn.textContent = "☀️ Light Mode";
  } else {
    themeToggleBtn.textContent = "🌙 Dark Mode";
  }
});
