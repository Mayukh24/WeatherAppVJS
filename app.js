const api = {
  key: "6c9db71b94934b8e103c65541ec307ee",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
    searchBox.value = "";
  
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${weather.main.temp}<span>°C</span>`;

  let weather_type = document.querySelector('.current .weather');
  weather_type.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;

  changeBackground(weather.weather[0].main);
}

function changeBackground(text){
  switch(text){
    case 'Thunderstorm':
      document.body.style.backgroundImage = "url('Images/Thunderstorm.jpg')";
      break;
    case 'Drizzle':
      document.body.style.backgroundImage = "url('Images/Drizzle.jpg')";
      break;
    case 'Rain':
      document.body.style.backgroundImage = "url('Images/Rain.jpg')";
      break;
    case 'Snow':
      document.body.style.backgroundImage = "url('Images/Snow.jpg')";
      break;
    case 'Clouds':
      document.body.style.backgroundImage = "url('Images/Clouds.jpg')";
      break;
    case 'Clear':
      document.body.style.backgroundImage = "url('Images/Clear.jpg')";
      break;
    default:
      document.body.style.backgroundImage = "url('Images/Mist.jpg')";
      break;      
  }
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${date} ${month} ${year} (${day})`;
  
 
}