var searchFormEl = document.getElementById("search-form"); // form element for handling events
var cityInputEl = document.getElementById("city-name"); // user input city name 
var buttonContainerEl =document.querySelector("#city-buttons"); // container for the serch history buttons
var fivedayForecastContainerEl =document.querySelector("#fiveday-forecast"); // five day forecast container 
var citySelectedEl =document.querySelector("#search-city"); //  displaying the city selected in main  page 
var weatherIconImageEl =document.querySelector("#weather-icon");// Adding weather icon 
// Weather -data variables declaration 
var humidityEl= document.querySelector("#humidity-city"); 
var tempEl = document.querySelector("#temp-city"); 
var windEl = document.querySelector("#wind-city");
var uvindexEl = document.querySelector("#uvindex-city");
var MY_API_KEY = "HvaacROi9w5oQCDYHSIk42eiDSIXH3FN"; // key to fetch data from weatherapi.org
var chosenCityName; //variable to store city name 
//Array of objects to store name-score in local storage 
var cityNameArr = JSON.parse(localStorage.getItem("city")) ||[];
var dayArr=[]; // To store 5 dates  for five day forecast
/* END OF  VARIABLE DECLARATION */

//Convert the first letter of the city name to uppercase
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
//color code the uv index txt background based on uv-index value 
var colorcodeUV = function(uvi){
    uvi= parseFloat(uvi);
    if (uvi>=0 && uvi <=2) {uvindexEl.classList.add("bg-success", "text-white");}
    else if(uvi >=3 && uvi<=5){uvindexEl.classList.add("bg-yellow", "text-white");}
    else if(uvi ==6 || uvi==7){uvindexEl.classList.add("bg-amber", "text-white");}
    else if (uvi >=8 && uvi<=10){uvindexEl.classList.add("bg-danger", "text-white");}
    else { uvindexEl.classList.add("bg-purple", "text-white");}
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
        alert(' For cities having two words please enter spaces between,Ex: Newyork - New York');   
        return; 
    } 
     })  
     .catch(function(error) {
        alert("Unable to connect to Weathermap");
      }) ;
}

// format UTC offset in human date format 
var formatDate =function(dayArr) {
  
    if (dayArr.length ==0){       
        alert("Empty list !! ");   
        }
  
    else{
            for (i = 1; i < dayArr.length; i++) 
            {
                const milliSecs = dayArr[i]*1000
                const dateObj = new Date(milliSecs);
                const normalDateFormat = dateObj.toLocaleDateString();
                dayArr[i]  =normalDateFormat;
            }
        }
    return;
}
 
// Display five day forecast 
var displayFivedayForecast =function (data){
    var iconURL;
    for(let i= 1; i< data.cnt; i++){
        
        dayArr[i] =data.list[i].dt;
    }  
    formatDate(dayArr); // format the date from UTC to human date format
    
    fivedayForecastContainerEl.classList.remove("hide"); // Display the forecast widget 
    //Start from index 1 as , the fetch returns the current date details at index 0
    for (i =1;i<data.cnt;i++){
     var dayContainer =document.querySelector("#day-"+i);
     var dateEl = document.querySelector("#date"+i);
     
     dateEl.innerHTML=dayArr[i];
     dayContainer.appendChild(dateEl);
     var imgEl =document.querySelector("#img"+i);
     iconURL = "http://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+".png"
     imgEl.setAttribute("src",iconURL);
     dayContainer.appendChild(imgEl);
     var temperEl = document.querySelector("#temp"+i);
     temperEl.innerHTML= data.list[i].temp.max + "°F";
     dayContainer.appendChild(temperEl);
     var humEl = document.querySelector("#hum"+i);
     humEl.innerHTML =data.list[i].humidity + "%";
     dayContainer.appendChild(humEl);
    var winEl =document.querySelector("#wind"+i);
    winEl.innerHTML=data.list[i].speed +"MPH";
    dayContainer.appendChild(winEl);
    
    }
}
// Fetch the five day forecast from today
var getfiveDayForecast =function(lati,longi){
    const fivedayURL ="http://api.openweathermap.org/data/2.5/forecast/daily?lat="+lati+"&lon="+longi+"&cnt=6&units=imperial&appid=6acd9728daeb3f35f10da98fa3f7eb4b";
    fetch(fivedayURL)
    .then(function(response) {
        if(response.ok){
         response.json().then(function(data) {
                displayFivedayForecast(data); //  call function to display data 
            });
        }
        else {
        alert('City Not found! For cities having two words please enter spaces between,Ex: Newyork - New York');
        return;
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

    // find the time zone  - for FUTURE enhancement using moment.tz with NODE. js ( not covered yet)
    var timeOffset =data.timezone;
    timeOffset = (timeOffset)/(1000*60) ;
     var m = cityDateObj.toLocaleString("en-US", {timeZoneName: "short"})
    
    
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

function handleErrors(res) {
   
  }
// get weather info of a city 
var getWeatherInfo =function(city){
  
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=6acd9728daeb3f35f10da98fa3f7eb4b";
    fetch (apiUrl)
    .then(function(response) {
        if(response.ok){
         response.json().then(function(data) {
                displayCityWeather(city,data)
                saveInLocalStorage(chosenCityName);
            });    
        }
     else {
       alert('City Not found!: For cities having two words please enter spaces between,Ex: Newyork - New York');

        throw new Error(response.error);
        return false ;
    } 
 })  
  .catch(function(error) {
   alert("Unable to provide data");
  
   
 });

 }

// Display search history button 
var displayButtons = function()
{
    var citArr= cityNameArr;

    while(buttonContainerEl.lastChild != null) {
    buttonContainerEl.removeChild(buttonContainerEl.lastChild);
    } // remove previous  children 

    // refresh the button list 
    if(citArr != null) {
    for ( let i=0;i<citArr.length; i++){
         var buttonEl = document.createElement("button");
            buttonEl.className ="btn";
        buttonEl.innerHTML =citArr[i] ;
        buttonContainerEl.appendChild(buttonEl);
     }
     if(citArr.length)
        document.querySelector("#city-list").classList.remove("hide"); //display the button element container  
    }

}
// Save cities in Local storage 
var saveInLocalStorage =function(city){
    if (cityNameArr.length >=5) cityNameArr.shift(); // Pop the city in the first index out of the array
    cityNameArr.push(city);
    // Making sure the city name is not repeated , we convert it into a Set element
    cityNameArr = [...new Set(cityNameArr)]; // Use Set datatype to store non-repetitive data 
    localStorage.setItem("city",JSON.stringify(cityNameArr));  
    // Display recently searched cities 
    displayButtons();   
}
// Event handler when user submits the city name     
var formSubmitHandler = function(event) {
    
    event.preventDefault(); 
    chosenCityName = cityInputEl.value.trim();
    chosenCityName.toLowerCase();
    if (chosenCityName) {    
        getWeatherInfo(chosenCityName) ;
        cityInputEl.value = ""; 
      } else {
        alert("Please enter a city name");
      }
  };
searchFormEl.addEventListener("submit",formSubmitHandler); //search button event listener 

// History button clicks handlers
var buttonClickHandler =function (event){
    event.preventDefault();
    event.target.getAttribute("innerHTML");
    let i= 0;
    while (i<cityNameArr.length){
    if (event.target.innerHTML === cityNameArr[i]) //check if the event.target element name matches with ciy name in Local storage, 
       { var cityClicked = cityNameArr[i] ;
        getWeatherInfo(cityClicked); //get the city weather info and display
        break;   
      }
      i++;
    }
};
buttonContainerEl.addEventListener("click", buttonClickHandler);  //Eventlistener for Serach history buttons 
