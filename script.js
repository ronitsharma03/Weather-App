const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'de0142362amsh2d71fa8909a5f88p18b6b4jsnda9c751a81a9',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

let cityName = document.getElementById("cityInput");
let citySearched = document.getElementById("search");
let submitBtn = document.getElementById("submit");
submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    getWeather(citySearched.value);
})


const getWeather = ((city) => {
fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+city, options)
    .then(response => response.json())
    .then((response) =>{
        // console.log(response);
        (cityName).innerHTML = city;
        max_temp.innerHTML = response.max_temp + "&#176 C"
        min_temp.innerHTML = response.min_temp + "&#176 C"
        temp.innerHTML = response.temp + "&#176 C"
        wind_speed.innerHTML = response.wind_speed + " Km/h"
    })
	.catch (err => console.error(err));
});


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
  

  

