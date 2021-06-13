# weather-report
A weather dashboard with a  weather outlook for user chosen city along with the weatherforecast for the next five days. 


The weather-dashbord  is provided with a form input where the user can input the city of his choice. 
Upon validation, he is  presented with current and future conditions for that city.
He is presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index. 
The above have been collected using two server -side api feth commands to https://openweathermap.org/
The fetch command retruned a json object from which I could obtain the current weather parameters of the city, excluding uv-index. 
Another fetch is made to "onecallAPI", with latitude and longitude values as paramaeter to fetch the uv-index.
The UV index field is color-coded   based on the conditions :favorable, moderate, or severe.
The user is also presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity.
The above was accomplished with another fetch API  https://openweathermap.org/forecast16, with an input parameter as number of days.
The city the user entered is added to the search history, by saving the city name in local-storage along with a search history button being created.
I have  respresented the array as Set collection, making sure even if the city is chose multiple times , its name is saved only once in the array and no duplicate buttons are created.
The search buttons have been added dynamically using Java script. 
When the user clicks on a city in the search histor he is again presented with current and future conditions for that city.
The applciation is responsive and has a clean interface. 

![Wireframe](https://github.com/Deeparkrish/MyPortfolio/blob/main/assets/img/wireframe.jpeg)

![Webpage](https://github.com/Deeparkrish/MyPortfolio/blob/main/assets/img/screencapture-file-Users-deepakrishnan-Mycode-ChallengeRepo-MyPortfolio-index-html-2021-05-16-23_26_28.png)


## Built With
* HTML
* CSS
* Java Script 
* powered by Server-side APIS 

## Website
https://deeparkrish.github.io/weather-report/

## Contribution
Made with ❤️ by [Deepa Krishnan]


