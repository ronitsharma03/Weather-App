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
    .then(response => response.json())
    .then((response) => {
    //   console.log(response); 
        cityInput.innerHTML = cityName;
        temp.innerHTML = response.main.temp + "&#176 C";
        max_temp.innerHTML = response.main.temp_max + "&#176 C";
        min_temp.innerHTML = response.main.temp_min + "&#176 C";
        wind_speed.innerHTML = response.wind.speed + " Km/h";
        description.innerHTML = response.weather[0].description;
        const iconCode = response.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
        let imageUrl = document.getElementById("weather-icon-type").src = iconUrl;
        document.getElementById("weather-icon-type").setAttribute("src", ""+iconUrl);

       


    })
    .catch(error => {
      console.error(error);
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
  

  

