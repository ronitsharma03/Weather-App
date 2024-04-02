let cityName = document.getElementById("cityInput");
let citySearched = document.getElementById("search");
let submitBtn = document.getElementById("submit");
submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    getWeather(citySearched.value);
})


const apiKey = "94c3a56393535f680509006b9b1b443a"; 



const getWeather = ((cityName)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then(response => {
        if (!response.ok) { // If response is not ok, throw an error
            throw new Error('City not found');
        }
        return response.json();
    })
    .then((response) => {
        // Your existing code to display the weather
        cityInput.innerHTML = cityName;
        temp.innerHTML = response.main.temp + "&#176 C";
        max_temp.innerHTML = response.main.temp_max + "&#176 C";
        min_temp.innerHTML = response.main.temp_min + "&#176 C";
        wind_speed.innerHTML = response.wind.speed + " Km/h";
        description.innerHTML = response.weather[0].description;
        const iconCode = response.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
        document.getElementById("weather-icon-type").src = iconUrl;
    })
    .catch(error => {
        // Handle the error
        console.error(error);
        // Display a user-friendly error message
        alert('Error: ' + error.message);
        // Optionally, clear the previous weather information or show a placeholder
        cityInput.innerHTML = "City not found";
        temp.innerHTML = "";
        max_temp.innerHTML = "";
        min_temp.innerHTML = "";
        wind_speed.innerHTML = "";
        description.innerHTML = "Please enter a valid city name.";
        document.getElementById("weather-icon-type").src = ""; // Clear the weather icon
    });
});


// For time of current location
function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    document.getElementById("current-time").innerHTML = h + ":" + m;
    let t = setTimeout(startTime, 500);
  }
  function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
  }
  startTime();
  

  

