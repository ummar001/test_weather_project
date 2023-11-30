// Replace 'YOUR_API_KEY' with the API key you obtained from OpenWeatherMap
const apiKey = '2b767bae393ae7e90bc4843aff5ee515';

// Get the HTML element where weather information will be displayed
const weatherInfoElement = document.getElementById('weather-info');

// Function to fetch weather data
async function getWeatherData(city) {
  // Construct the API URL for OpenWeatherMap
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    // Use the fetch API to make an asynchronous request to OpenWeatherMap
    const response = await fetch(apiUrl);

    // Parse the response as JSON
    const data = await response.json();

    // Check if the request was successful (HTTP status code 200)
    if (response.ok) {
      // If successful, display the weather information on the webpage
      displayWeatherData(data);
    } else {
      // If not successful, display an error message based on the response from OpenWeatherMap
      displayError('Error fetching weather data: ' + data.message);
    }
  } catch (error) {
    // If an error occurs during the fetch or JSON parsing, log the error and display a generic error message
    console.error('Error fetching weather data:', error);
    displayError('An error occurred while fetching weather data. Please try again later.');
  }
}

// Function to display weather data on the webpage
function displayWeatherData(data) {
  // Extract relevant information from the API response
  const cityName = data.name;
  const temperature = data.main.temp;
  const weatherDescription = data.weather[0].description;

  // Create HTML content to display the weather information
  const weatherHTML = `
    <h2>Current Weather in ${cityName}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Description: ${weatherDescription}</p>
  `;

  // Update the HTML element with the new weather information
  weatherInfoElement.innerHTML = weatherHTML;
}

// Function to display an error message
function displayError(errorMessage) {
  // Create HTML content for the error message
  const errorHTML = `
    <p class="error-message">${errorMessage}</p>
  `;

  // Update the HTML element with the error message
  weatherInfoElement.innerHTML = errorHTML;
}

// Example: Fetch weather data for a default city on page load
document.addEventListener('DOMContentLoaded', function () {
  // Call the getWeatherData function with a default city (e.g., London)
  getWeatherData('London');
});

// Example: Fetch weather data for a new city when the user searches
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');

searchButton.addEventListener('click', function () {
  // Get the value entered by the user in the city input field
  const city = cityInput.value;

  // Check if the user entered a city name
  if (city.trim() !== '') {
    // If a city is entered, call the getWeatherData function with the entered city
    getWeatherData(city);
  } else {
    // If the city input is empty, display an error message
    displayError('Please enter a city name.');
  }
});
