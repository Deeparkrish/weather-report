var searchFormEl = document.getElementById("search-form");
var cityInputEl = document.getElementById("city-name");
var cityButtonsEl =document.querySelector("#city-buttons");
var citySelectedEl =document.querySelector("#search-city");


// get city name  from input element
var chosenCityName = cityInputEl.value.trim();
console.log(cityInputEl);
// console.log(chosenCityNacime);
console.log(chosenCityName);

searchFormEl.addEventListener("submit",formSubmitHandler);

var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log("button was clicked");
    console.log(event);
    if (chosenCityName) {
        console.log(chosenCityName);
        displayCityWeather(chosenCityName);
        cityInputEl.value = "";
      } else {
        alert("Please enter a city name");
      }
  };


var displayCityWeather= function(chosenCityName) 
{
    citySelectedEl.innerHTML =chosenCityName;
    console.log(chosenCityName);
    
};

cityButtonsEl.addEventListener("click", buttonClickHandler);
var buttonClickHandler =function (event){
    event.preventDefault();
    console.log(event);
    event.target.getAttribute("data-cityname");
    if (chosenCityName) {
        // getWeatherInfo(cityname);
        console.log(chosenCityName);
        // clear old content
        
      }
};

var getWeatherInfo =function (){
    console.log("function was called");
   fetch('https://openweathermap.org/find?q=austin');
    // fetch(https://openweathermap.org/api/one-call-api)
};
getWeatherInfo();