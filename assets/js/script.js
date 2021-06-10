var searchFormEl = document.getElementById("search-form");
var cityInputEl = document.getElementById("city-name");
var buttonContainerEl =document.querySelector("#city-buttons");
var citySelectedEl =document.querySelector("#search-city");
var weatherIconImageEl =document.querySelector("#weather-icon");

var humidityEl= document.querySelector("#humidity-city");
var tempEl = document.querySelector("#temp-city");
var windEl = document.querySelector("#wind-city");
var uvindexEl = document.querySelector("#uvindex-city");
var MY_API_KEY = "HvaacROi9w5oQCDYHSIk42eiDSIXH3FN";

var chosenCityName; //variable to store city name 
//Array of objects to store name-score in local storage 
var cityNameArr = JSON.parse(localStorage.getItem("cityNameArr")) ||[];


//Convert the first letter of the city name to uppercase

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

var colorcodeUV = function(uvi){
uvi= parseFloat(uvi);
 if (uvi>=0 && uvi <=2) {uvindexEl.classList.add("bg-success", "text-white");}
else if(uvi >=3 && uvi<=5){uvindexEl.classList.add("bg-yellow", "text-white");}
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
            
            console.log(data);
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

var formatDate =function(dayArr) {
  
    if (dayArr.length ==0){       
        alert("Empty list !! ");   
        return ;}
  
    else{
        for (i = 1; i < dayArr.length; i++) {
            const milliSecs = dayArr[i]*1000
            const dateObj = new Date(milliSecs);
            const normalDateFormat = dateObj.toLocaleDateString();
            dayArr[i]  =normalDateFormat;
            }
        
    return dayArr;
        }
 
}
var displayFivedayForecast =function (data){
    console.log ("five day forecast display function called");
    
    var dayArr=[]; 
    var temp =[];
    var humidity =[];
    var wind =[];
    var iconURL = [];
   
    for(let i= 0; i< data.cnt; i++){
        wind[i]= data.list[i].speed;   
        humidity[i]= data.list[i].humidity;   
        temp[i]= data.list[i].temp;   
        iconURL[i] = "http://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+".png"
        dayArr[i] =data.list[i].dt;
    }
    
    formatDate(dayArr);

}
var getfiveDayForecast =function(lati,longi){

    const fivedayURL ="http://api.openweathermap.org/data/2.5/forecast/daily?lat="+lati+"&lon="+longi+"&cnt=6&units=imperial&appid=6acd9728daeb3f35f10da98fa3f7eb4b";
    fetch(fivedayURL)
    .then(function(response) {
        if(response.ok){
         response.json().then(function(data) {
                
                displayFivedayForecast(data);
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

// Display the city's current weather details 
var displayCityWeather= function(chosenCityName, data) 
{
    if (data.length === 0) {
        citySelectedEl.textContent = "Could not obtain weather-data.";
        return;
    }
   
    
   //  Get the current date 
    var thisDate = data.dt;
   // Convert the UTC date in normal date format
    thisDate = thisDate*1000;
    const cityDateObj = new Date(thisDate);
    thisDate = cityDateObj.toLocaleDateString();
   
   
    //Set the first letter of the City name to uppercase 
    var chosenCityTitle=toTitleCase(chosenCityName);
    weatherIconURL = "http://openweathermap.org/img/wn/"+data.weather[0].icon+".png"

    // find the time zone 
    var timeOffset =data.timezone;

    
    // Get the latitude and longitude to determine Uv-index 
    var cityLat = data.coord.lat;
    var cityLon = data.coord.lon;

    // Get the Uv-index
    getUVIndex(cityLat,cityLon); 
    
    // Display temeprature , humidity
    tempEl.innerHTML ="Temperature  :"+data.main.temp+"°F";
    humidityEl.innerHTML ="Humidity :"+data.main.humidity +"%";
    windEl.innerHTML ="Wind :"+ data.wind.speed +"MPH"; 

    //Add cityname ,date and weather icon 
    weatherIconImageEl.setAttribute("src",weatherIconURL);
    citySelectedEl.innerHTML =chosenCityTitle+" "+thisDate;
    citySelectedEl.append(weatherIconImageEl); 

    // display the 5 day frorecast container 
    document.getElementById("forecast-container").classList.remove("hide");
    //Get 5 day  forecast 
    getfiveDayForecast(cityLat,cityLon);
    
};

var getWeatherInfo =function(city){
    console.log("Weather is good!");
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=6acd9728daeb3f35f10da98fa3f7eb4b"

    fetch (apiUrl)
    .then(function(response) {
        if(response.ok){
         response.json().then(function(data) {
                console.log(data);
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
var saveInLocalStorage =function(city){

    cityNameArr.push(city);
    // Making sure the cuty is not repeated , we convert it into a Set element
    cityNameArr = [...new Set(cityNameArr)];

    localStorage.setItem("city",JSON.stringify(cityNameArr));   

// For every obj in highscoreArr create a list element and add it to the container
    
    document.querySelector("#city-list").classList.remove("hide");
    // for ( let i=0;i<cityNameArr.length; i++){
    var buttonEl = document.createElement("button");
    buttonEl.className ="btn";
    buttonEl.innerHTML =city ;
   buttonContainerEl.appendChild(buttonEl);
    // }
      
}
        
var formSubmitHandler = function(event) {
    event.preventDefault(); 
    chosenCityName = cityInputEl.value.trim();
    chosenCityName.toLowerCase();
    if (chosenCityName) {   
        saveInLocalStorage (chosenCityName);
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
//El.addEventListener("click", buttonClickHandler);
