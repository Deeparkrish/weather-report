var searchFormEl = document.getElementById("search-form");
var cityInputEl = document.getElementById("city-name");
var cityButtonsEl =document.querySelector("#city-buttons");
var citySelectedEl =document.querySelector("#search-city");
var weatherIconImageEl =document.querySelector("#weather-icon");


var humidityEl= document.querySelector("#humidity-city");
var tempEl = document.querySelector("#temp-city");
var windEl = document.querySelector("#wind-city");
var uvindexEl = document.querySelector("#uvindex-city");
var MY_API_KEY = "HvaacROi9w5oQCDYHSIk42eiDSIXH3FN";


var chosenCityName;
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

var displayCityWeather= function(chosenCityName, data) 
{
    if (data.length === 0) {
        citySelectedEl.textContent = "Could not obtain weather-data.";
        return;
    }
    var thisDate = moment().format('MM/DD/YY');
    var chosenCityTitle=toTitleCase(chosenCityName);
    citySelectedEl.innerHTML =chosenCityTitle+" "+thisDate;
    tempEl.innerHTML ="Temperature  :"+data.main.temp;
    humidityEl.innerHTML ="Humidity :"+data.main.humidity;
    windEl.innerHTML ="Wind :"+ data.wind.speed;
    
    var cityLat = data.coord.lat;
    var cityLon = data.coord.lon;
    var UVIndexEl =getUVIndex(cityLat,cityLon);
    


    // responseContainerEl.innerHTML = `<img src=${response.data.image_url}  />`;
};
var getUVIndex = function (){


}
var getWeatherInfo =function(city){
    console.log("Weather is good!");
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=6acd9728daeb3f35f10da98fa3f7eb4b"

    fetch (apiUrl)
    .then(function(response) {
        if(response.ok){
         response.json().then(function(data) {
                displayCityWeather(city,data)
            });
        }
        else {
        alert('City Not found!');
            }  
    });
//     .catch(function(error) {
//         // Notice this `.catch()` getting chained onto the end of the `.then()` method
//         alert("Unable to connect to Weathermap");
//       });
}

var formSubmitHandler = function(event) {
    event.preventDefault(); 
    chosenCityName = cityInputEl.value.trim();
    chosenCityName.toLowerCase();
    if (chosenCityName) {   
        getWeatherInfo(chosenCityName);
        cityInputEl.value = "";
       
    var citLon = data.coord.lon;
      } else {
        alert("Please enter a city name");
      }
  };
searchFormEl.addEventListener("submit",formSubmitHandler);

var buttonClickHandler =function (event){
    event.preventDefault();
    console.log(event);
    event.target.getAttribute("data-cityname");
    if (chosenCityName) {
        getWeatherInfo(chosenCityName);
        console.log(chosenCityName);
        // clear old content
        
      }
};
cityButtonsEl.addEventListener("click", buttonClickHandler);