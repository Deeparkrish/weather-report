var searchFormEl = document.getElementById("search-form");
var cityInputEl = document.getElementById("city-name");
var cityButtonsEl =document.querySelector("#city-buttons");
var citySelectedEl =document.querySelector("#search-city");
// var searchButtonEl = document.getElementById("search-btn");

var chosenCityName;
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    
    chosenCityName = cityInputEl.value.trim();
    console.log(chosenCityName);
    chosenCityName=toTitleCase(chosenCityName);
   
    if (chosenCityName) {
        
        displayCityWeather(chosenCityName);
        cityInputEl.value = "";
      } else {
        alert("Please enter a city name");
      }
  };
  searchFormEl.addEventListener("submit",formSubmitHandler);


var displayCityWeather= function(chosenCityName) 
{
    citySelectedEl.innerHTML =chosenCityName;
    console.log(citySelectedEl);
    
};

var getWeatherInfo =function(city){
    console.log("Weather is good!");

 };
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


 
     
   
