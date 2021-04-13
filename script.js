const city = document.querySelector(".city")
const country = document.querySelector(".country")
const tempFigure = document.querySelector(".temp-figure")
const unit = document.querySelector(".unit")
const tempIcon = document.querySelector(".weather-icon")
const weatherType = document.querySelector(".weather-type")
const weatherDesc = document.querySelector(".desc")
const container = document.querySelector(".container")
const forecast = document.querySelector(".forecast")
const next24Box = document.querySelector(".next-24-box")
const nextHour = document.querySelector(".hour")
const nextTimeOfDay = document.querySelector(".time-of-day")
const nextTemp = document.querySelector(".next-24hr-temp")
const nextType = document.querySelector(".next-24hr-weather-type")
const nextUnit = document.querySelector(".next-24hr-unit")
const nextIcon = document.querySelector(".next-24hr-weather-icon")
const sevenDayForecast = document.querySelector(".seven-day-forecast")
const nextSevenBox = document.querySelector(".next-7-box")
const nextDay = document.querySelector(".day")
const nextMinTemp = document.querySelector(".min-temp")
const nextMaxTemp = document.querySelector(".max-temp")
const nextDayIcon = document.querySelector(".next-seven-icon")
const footerYear = document.querySelector(".year")
const weatherAPIKey = '8dc3d31ab463cd964459f51f1846f13a'
const locationAPIKey = '52e2cd6a10ad403751aa7d2f0a196a6280a1e76a70047dd6b829a1e8'
var weatherCity;
var countryCode;
var temp;
var tempType;
var tempDesc;
var icon;
var latitude;
var longitude;

var d = new Date()
var h = d.getHours()
var y = d.getFullYear()
footerYear.innerHTML = y
 
  if (h > 5 && h < 18 ) {
    container.style.background = `url('img/daybackground.gif') #006fad`;
    container.style.backgroundSize = `cover`;
    container.style.backgroundRepeat = `no-repeat`
    container.style.backgroundPosition = `center`
  } else {
    container.style.background = `url('img/nightbackground.gif') #003959`;
    container.style.backgroundSize = `cover`;
    container.style.backgroundRepeat = `no-repeat`
    container.style.backgroundPosition = `center`
  }  

  const successCallback = (position) => {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    let newWeather = function () {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPIKey}`)
      .then(response => response.json())
      .then(newWeatherData => {

        console.log(newWeatherData)
        console.log(newWeatherData.main.temp)
        temp = (newWeatherData.main.temp - 273.15) * 9/5 + 32 ;
        tempType = newWeatherData.weather[0].main;
        tempDesc = newWeatherData.weather[0].description;
        icon = newWeatherData.weather[0].icon;
        weatherCity = newWeatherData.name
        countryCode = newWeatherData.sys.country;
        city.innerHTML = weatherCity
        country.innerHTML = countryCode
        tempFigure.innerHTML = Math.ceil(temp);
        weatherType.innerHTML = tempType;
        weatherDesc.innerHTML = tempDesc;
        tempIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        if (countryCode !== "US") {
          temp = Math.ceil((newWeatherData.main.temp - 273.15));
          tempFigure.innerHTML = temp;
          unit.innerHTML = "°C"
          console.log(temp)
        }
      
      });
    }

    let sevenDayWeather = function () {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&appid=${weatherAPIKey}`)
      .then(response => response.json())
      .then(sevenDayWeather => {
        
        const sevenDayArray = Object.entries(sevenDayWeather.daily)
        sevenDayArray.shift()
        nextDayIcon.src = `https://openweathermap.org/img/wn/${newIcon}.png`;
  
        sevenDayArray.forEach(output);
  
        function output(item, index){
  
          const milliseconds = sevenDayArray[index][1].dt;
          var myDate = new Date(milliseconds*1000);
          var dateSplit = myDate.toLocaleDateString(undefined, {weekday: 'long'}).split(" ")
          nextDay.innerHTML = dateSplit[0]
          nextMinTemp.innerHTML = Math.ceil(((sevenDayArray[index][1].temp.min) - 273.15) * 9/5 + 32);
          nextMaxTemp.innerHTML = Math.ceil(((sevenDayArray[index][1].temp.max) - 273.15) * 9/5 + 32);
          newIcon = sevenDayArray[index][1].weather[0].icon;
          nextDayIcon.src = `https://openweathermap.org/img/wn/${newIcon}.png`;

          if (countryCode !== "US") {
            nextMinTemp.innerHTML = Math.ceil(((sevenDayArray[index][1].temp.min) - 273.15));
            nextMaxTemp.innerHTML = Math.ceil(((sevenDayArray[index][1].temp.max) - 273.15));

            console.log(nextMinTemp.innerHTML)
          }

          const newDay = document.createElement("div");
          sevenDayForecast.appendChild(newDay);
          newDay.classList.add("next-7-box")


          newDay.innerHTML = `
          <p class="day">${nextDay.innerHTML}</p>
          <p class="min-temp">${nextMinTemp.innerHTML} °</p>
          <p class="max-temp">${nextMaxTemp.innerHTML} °</p>
          <img class="next-seven-icon" src="${nextDayIcon.src}" alt="">
          `
          
        }
      
      });
    }

    let twentyFourHourWeather = function () {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&appid=${weatherAPIKey}`)
      .then(response => response.json())
      .then(twentyFourHourWeather => {
         
        
        const weatherArray = Object.entries(twentyFourHourWeather.hourly)
        weatherArray.splice(25, 24)
        weatherArray.shift()
  
        nextTemp.innerHTML = Math.ceil(((weatherArray[0][1].temp) - 273.15) * 9/5 + 32);
        // console.log(nextTemp.innerHTML)
        nextType.innerHTML = weatherArray[0][1].weather[0].main;
        newIcon = weatherArray[0][1].weather[0].icon;
        nextIcon.src = `https://openweathermap.org/img/wn/${newIcon}.png`;
        nextUnit.innerHTML = "°F"
  
        weatherArray.forEach(output);
  
        function output(item, index){
  
          const milliseconds = weatherArray[index][1].dt;
          var myDate = new Date(milliseconds*1000);
          var nextHours = myDate.getHours()
          nextHour.innerHTML = nextHours
  
          if (nextHours > 12) {
              nextHours = myDate.getHours() - 12;
              nextTimeOfDay.innerHTML = " PM"
          } else if (nextHours === 0) {
            nextHours = "12"
            nextTimeOfDay.innerHTML = " AM" 
          } else if (nextHours === 12) {
            nextTimeOfDay.innerHTML = " PM"
          }
          else {
            nextHours = myDate.getHours();
            nextTimeOfDay.innerHTML = " AM"
          }
          
          nextTemp.innerHTML = Math.ceil(((weatherArray[index][1].temp) - 273.15) * 9/5 + 32);
          nextType.innerHTML = weatherArray[index][1].weather[0].main;
          newIcon = weatherArray[index][1].weather[0].icon;
          nextIcon.src = `https://openweathermap.org/img/wn/${newIcon}.png`;

          if (countryCode !== "US") {
            temp =  Math.ceil(((weatherArray[index][1].temp) - 273.15));
            nextTemp.innerHTML = temp;
            nextUnit.innerHTML = "°C";
            console.log(nextUnit.innerHTML)
          }

          const newForecast = document.createElement("div");
          forecast.appendChild(newForecast);
          newForecast.classList.add("next-24-box")
          newForecast.innerHTML = `
          <div class="time">
          <p class="hour">${nextHours}</p> <p class="time-of-day">${nextTimeOfDay.innerHTML}</p>
          </div>
          <div class="next-24">
              <p class="next-24hr-temp">${nextTemp.innerHTML}</p>
              <p class="next-24hr-unit">°</p>
          </div>
          <img class="next-24hr-weather-icon" src="${nextIcon.src}" alt="">
          <p class="next-24hr-weather-type">${nextType.innerHTML}</p>
          `
        }
      });
    }

    
  
    newWeather()
    twentyFourHourWeather()
    sevenDayWeather()
  };
  
  const errorCallback = (error) => {
    console.error(error);
  };
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


  

  
  