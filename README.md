# Weather-dashboard
A weather dashboard with a  weather outlook for user chosen city along with the weatherforecast for the next five days. 


* The weather-dashbord  is provided with a form input where the user can input the city of his choice. 
* Upon validation, he is  presented with current and future conditions for that city.
* He is presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index. 
* The above have been collected using two server -side api fetch commands to https://openweathermap.org/
* The fetch command returned a json object from which I could obtain the current weather parameters of the city, excluding uv-index. 
* Another fetch is made to "onecallAPI", with latitude and longitude values as paramaeter to fetch the uv-index.
* The UV index field is color-coded based on the conditions :favorable, moderate, or severe.
* The user is also presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the   humidity.
* The above was accomplished with another fetch API  https://openweathermap.org/forecast16, with an input parameter as number of days.
* The city the user entered is added to the search history, by saving the city name in local-storage along with a search history button being created.
* I have  respresented the array as Set collection, making sure even if the city is chose multiple times,its name is saved only once in the array,
  and no duplicate buttons are created.    
* The search buttons have been added dynamically using Java script. 
* When the user clicks on a city in the search histor he is again presented with current and future conditions for that city.
* The application is responsive and has a clean interface. 
* the HTML page is designed  using Bootstrap and the elements are styled using CSS.


## Data/API endpoints source :
https://openweathermap.org/api

## Future enchancements :
* Adding the time zone  and the destination time value, using moment.tz (Node.js) once we learn the technology.
* Displaying  all cities with same name in multpile  geographic locations and allowing the user to click on his choice, upon which the corresponding weather data
  is displayed.
## Pseudocode:
![Webpage](https://github.com/Deeparkrish/weather-report/blob/main/assets/img/pseudo1.jpeg)

![Webpage](https://github.com/Deeparkrish/weather-report/blob/main/assets/img/psuedo2.jpeg)

![Webpage](https://github.com/Deeparkrish/weather-report/blob/main/assets/img/weather2.png)


## Built With
* HTML
* CSS
* Java Script
* Bootstrap
* powered by Server-side APIS 

## Website
https://deeparkrish.github.io/weather-report/

## Contribution
Made with ?????? by [Deepa Krishnan]


