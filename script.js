const apiKey = "e494ce541c1e2185e16324f8ffe1b006";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const citySuggestions = document.getElementById('city-suggestions'); // Added

// Function to fetch city suggestions based on user input
searchBox.addEventListener('input', function() {
  const userInput = this.value.trim();

  // Clear previous suggestions
  citySuggestions.innerHTML = '';
 

  if (userInput.length > 2) {
    // Make an API request to fetch city suggestions based on userInput
    fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&refine=cou_name_en%3A%22Afghanistan%22&refine=cou_name_en%3A%22Angola%22&refine=cou_name_en%3A%22Algeria%22&refine=cou_name_en%3A%22Costa%20Rica%22&refine=cou_name_en%3A%22Congo%2C%20Democratic%20Republic%20of%20the%22&refine=cou_name_en%3A%22Central%20African%20Republic%22&refine=cou_name_en%3A%22Cameroon%22&refine=cou_name_en%3A%22Burundi%22&refine=cou_name_en%3A%22Burkina%20Faso%22&refine=cou_name_en%3A%22Brunei%20Darussalam%22&refine=cou_name_en%3A%22Brazil%22&refine=cou_name_en%3A%22India%22&refine=cou_name_en%3A%22Iceland%22&refine=cou_name_en%3A%22Indonesia%22&refine=cou_name_en%3A%22Iran%2C%20Islamic%20Rep.%20of%22&refine=cou_name_en%3A%22Iraq%22&refine=cou_name_en%3A%22Ireland%22&refine=cou_name_en%3A%22Isle%20of%20Man%22&refine=cou_name_en%3A%22Italy%22&refine=cou_name_en%3A%22Japan%22&refine=cou_name_en%3A%22Jordan%22&refine=cou_name_en%3A%22Kyrgyzstan%22?query=${userInput}`)
      .then(response => response.json())
      .then(data => {
        data.forEach(city => {
          const li = document.createElement('li');
          li.textContent = city.name;
          citySuggestions.appendChild(li);
        });
      })
      .catch(error => console.error('Error fetching city suggestions:', error));
  }
});

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "clouds-and-sun.png";
        break;
      case "Clear":
        weatherIcon.src = "sun.png";
        break;
      case "Rain":
        weatherIcon.src = "rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "fog.png";
        break;
      default:
        weatherIcon.src = ""; // You might want to add a default image here
        break;
    }

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
