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

//Convert the first letter of the city name to uppercase
var chosenCityName;
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

var colorcodeUV = function(uvi){
uvi= parseFloat(uvi);
 if (uvi>=0 && uvi <=2) {uvindexEl.classList.add("bg-success", "text-white");}
else if(uvi >=3 && uvi<=5){uvindexEl.classList.add("bg-warning", "text-white");}
else if(uvi ==6 || uvi==7){uvindexEl.classList.add("bg-amber", "text-white");}
else if (uvi >=8 && uvi<=10){uvindexEl.classList.add("bg-danger", "text-white");}
else { uvindexEl.classList.add("bg-purple", "text-white");

}
}
// get the uvindex  of a city
var getUVIndex = function (lati, longi){
    const uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lati+"&lon="+longi+"&exclude=hourly,daily&units=imperial&appid=6acd9728daeb3f35f10da98fa3f7eb4b"
    fetch(uvURL)
    .then(function(response) {
    if(response.ok){
        response.json().then(function(data) {
            var uvTitleEl = document.querySelector("#uv-title");
            uvTitleEl.innerHTML="UV-index :"
            uvindexEl.innerHTML = data.current.uvi; 
            uvTitleEl.appendChild(uvindexEl);
            var uvnumber = parseInt(data.current.uvi) ;
            colorcodeUV(uvnumber);            
        });
    }
    else {
        alert('City Not found!');      
    } 
     })  
    return ;
}

// Display the city's current weather details 
var displayCityWeather= function(chosenCityName, data) 
{
    if (data.length === 0) {
        citySelectedEl.textContent = "Could not obtain weather-data.";
        return;
    }
    var thisDate = moment().format('MM/DD/YY');
    var chosenCityTitle=toTitleCase(chosenCityName);
    weatherIconURL = "http://openweathermap.org/img/wn/"+data.weather[0].icon+".png"

    var cityLat = data.coord.lat;
    var cityLon = data.coord.lon;

    getUVIndex(cityLat,cityLon); 
    

    tempEl.innerHTML ="Temperature  :"+data.main.temp+"°F";
    humidityEl.innerHTML ="Humidity :"+data.main.humidity +"%";
    windEl.innerHTML ="Wind :"+ data.wind.speed +"MPH"; 
    weatherIconImageEl.setAttribute("src",weatherIconURL);

    citySelectedEl.innerHTML =chosenCityTitle+" "+thisDate;
    citySelectedEl.append(weatherIconImageEl); 
    
};

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
    })
  .catch(function(error) {
   alert("Unable to connect to Weathermap");
 });
 }

var formSubmitHandler = function(event) {
    event.preventDefault(); 
    chosenCityName = cityInputEl.value.trim();
    chosenCityName.toLowerCase();
    if (chosenCityName) {   
        getWeatherInfo(chosenCityName);
        cityInputEl.value = ""; 
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
