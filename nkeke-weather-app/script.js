const city = document.querySelector(".city")
const country = document.querySelector(".country")
const tempFigure = document.querySelector(".temp-figure")
const unit = document.querySelector(".unit")
const tempIcon = document.querySelector(".weather-icon")
const weatherType = document.querySelector(".weather-type")
const weatherDesc = document.querySelector(".desc")
const container = document.querySelector(".container")
const weatherAPIKey = '8dc3d31ab463cd964459f51f1846f13a'
const locationAPIKey = '52e2cd6a10ad403751aa7d2f0a196a6280a1e76a70047dd6b829a1e8'
var weatherCity;
var countryCode;
var temp;
var tempType;
var tempDesc;
var icon;


var d = new Date()
var h = d.getHours()



let backgroundChange = function () {
  if (h > 6, h < 18) {
    container.style.background = "url('img/daybackground.gif') #006fad no-repeat cover center";
  } else {
    container.style.background = "url('img/nightbackground.gif') #003959 no-repeat cover center";
  }  
}




let weather = function () {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherCity},${countryCode}&appid=${weatherAPIKey}`)
  .then(response => response.json())
  .then(weatherData => {
    console.log(weatherData)
    temp = (weatherData.main.temp - 273.15) * 9/5 + 32;
    tempType = weatherData.weather[0].main;
    tempDesc = weatherData.weather[0].description;
    icon = weatherData.weather[0].icon;
    tempFigure.innerHTML = Math.ceil(temp);
    weatherType.innerHTML = tempType;
    weatherDesc.innerHTML = tempDesc;
    tempIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    
    if (countryCode !== "US") {
      temp = weatherData.main.temp - 273.15;
      tempFigure.innerHTML = Math.ceil(temp)
      unit.innerHTML = "°C"
      console.log(temp)
    } else {
      temp = (weatherData.main.temp - 273.15) * 9/5 + 32;
      unit.innerHTML = "°F";
    }
  });
}

fetch('https://api.ipdata.co/?api-key=52e2cd6a10ad403751aa7d2f0a196a6280a1e76a70047dd6b829a1e8')
  .then(response => response.json())
  .then(data => {
    weatherCity = data.city;
    countryCode = data.country_code;
    city.innerHTML = weatherCity
    country.innerHTML = countryCode

    backgroundChange()
    weather()
    
  });
  
  
  // console.log(math.round(55.44746))
  

  