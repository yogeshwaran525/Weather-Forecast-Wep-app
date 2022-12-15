// Time elements
const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const timezone = document.getElementById('time-zone');
// 
// Todays Forecast details
const currentweatheritemsE1 = document.getElementById('current-weather-items');  
// 
// 
const place = document.getElementById('place'); 
const Daily = document.getElementById('day');
// 
// Search  Section
var searchbar = document.getElementById('search-bar');
// 
// Hourly Forecasts date
const hourdate1 = document.getElementById('hour-date1');
const hourdate2 = document.getElementById('hour-date2');
const hourdate3 = document.getElementById('hour-date3');
// 
// Hourly Forecast Datas
const hourcontainer1 = document.getElementById('hour-container1');
const hourcontainer2 = document.getElementById('hour-container2');
const hourcontainer3 = document.getElementById('hour-container3');
// 
// Front page preloading Animation
let preloader = document.getElementById('loading');
// FooterConainer 
const footercontainer = document.getElementById('footer-container');
// Array of date and month 
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'oct', 'Nov', 'Dec'];
// Periodically refresh the data
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const datewithzero = date < 10 ? "0" + date : date;
    const day = time.getDay();
    const hour = time.getHours();
    const hoursin12horsformat = hour >= 13 ? hour % 12 : hour;
    const hourswithzeroformat = hoursin12horsformat < 10 ? "0" + hoursin12horsformat : hoursin12horsformat;
    const minutes = time.getMinutes();
    const minuteswithzeroformat = minutes < 10 ? "0" + minutes : minutes;
    const AmPm = hour >= 12 ? 'PM' : 'AM';
    timeE1.innerHTML = hourswithzeroformat + ':' + minuteswithzeroformat + '' + `<span id="AM-PM">${AmPm}</span>`;
    dateE1.innerHTML = days[day] + '&nbsp' + datewithzero + '&nbsp' + months[month];
}, 1000);

// Getlocation Data Input 
let input = '';
// Location Icon To trigger the getweaherdata Function
locationbutton = document.getElementById('locationbutton');
locationbutton.addEventListener('click', getweatherData);

function getweatherData() {

    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;
        console.log(success);
        mycoordinates = `${latitude},${longitude}`;
        input = mycoordinates;
        searchfunction();
        preloader.style.display = 'none';

    })

}
// 
// 

form = document.getElementById('search');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    input = searchbar.value;
    console.log(input);
    bublinganimation()
    searchfunction()
    
})








// If Searchbar input is empty show alert message
// Search Bar Input OK or Notok Show green or red background Status
function bublinganimation() {

    if (searchbar.value == 0) {

        setTimeout(function () {
            searchbar.style.background = 'rgb(240, 95, 95)'
        }, 1000)
        setTimeout(function () {
            searchbar.style.background = 'rgb(235, 132, 132)'
        }, 4000)
        setTimeout(function () {
            searchbar.style.background = 'none'
        }, 6000)

        alert('Enter the valid location name or lattitude,longitude format')

    } else {
        searchbar.style.background = 'hsl(103, 80%, 66%)'

        setTimeout(function () {
            searchbar.style.background = 'linear-gradient(100deg, #29465a, #334e5efb)';
        }, 2000)

        setTimeout(function () {
            preloader.style.display = 'none'
        }, 1000)

    }
}
// Search Function
function searchfunction() {

    const options = {
        method: 'GET',
        headers: {
            // 
            // 'X-RapidAPI-Key': '',
            // Rapidapi.com Website (Weatherapi-app api) API key for 1 month trail
            // 
            // 

            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }

    };
    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${input}&days=3`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showData(data)

        }).catch(() => {
            alert('No Matching location found. Or OOPS Something Went Wrong Try Again.')
        });

}
// Calling Function
function showData(data) {
    let { code } = data;
    if (code == code) {
        preloader.style.display = 'none';
    } else (code != code)
    {
        showeatherData(data);
    }

}
// 
// Todays Forecast data
function showeatherData(data) {
    let { humidity, pressure_in, temp_c, wind_kph } = data.current;
    let { forecastday } = data.forecast;
    let { name } = data.location;


    place.innerHTML = `<div id=place>&nbsp;&nbsp;Weather in ${name}</div>`;
    currentweatheritemsE1.innerHTML = `     
    <div id="text">${forecastday[0].day.condition.text}</div><br>
    <div class="weather-item">    
            <div>Humidity</div>
            <div>${humidity}%</div>                    
        </div>
        <div class="weather-item">
            <div>Pressure</div>
            <div>${pressure_in}</div>
        </div>
        <div class="weather-item">
            <div>Temperature</div>
            <div>&nbsp&nbsp${temp_c}°C</div>
        </div>
        <div class="weather-item">
            <div>Windspeed</div>
            <div>${wind_kph}&nbsp;kph</div>
        </div>
    </div>`;


    showDailyForecast(data);

}
// 
// Show daily forecast data
function showDailyForecast(data) {

    let otherday = '';
    for (s = 0; s < 3; s++) {

        let { forecastday } = data.forecast;
        otherday += `
    <ul  class="day" id="day">
    <li  class="day-container" id="day-container">
    <div id="daydate">${window.moment(forecastday[s].date).format('DD-MM-YYYY')}</div>
    <div id="daytext">${forecastday[s].day.condition.text}</div>
    <img id="dayimage" src="images/64x64/day/${forecastday[s].day.condition.code}.png"><br> 
    <div id="day1-weather-item">
        <div id="day1">Sunrise</div>
        <div>&nbsp;${forecastday[s].astro.sunrise}</div>
    </div>
    <div id="day1-weather-item">
        <div id="day1">Sunset</div>
        <div>&nbsp;${forecastday[s].astro.sunset}</div>
    </div>
    <div id="day1-weather-item">
        <div id="day1">Humidity</div>
        <div>&nbsp;${forecastday[s].day.avghumidity}%</div>
    </div>
    <div id="day1-weather-item">
        <div id="day1">Temperature</div>
        <div>&nbsp;&nbsp;${forecastday[s].day.avgtemp_c}°C</div>
    </div> 
    </li>
    </ul>   `;

    }

    Daily.innerHTML = otherday;
    showHourlyForecast(data);
}

// Show Hourly Forecast data
function showHourlyForecast(data) {
    let hourlyforecastday1 = '';
    let hourlyforecastday2 = '';
    let hourlyforecastday3 = '';
    let hourlyforecastdate1 = '';
    let hourlyforecastdate2 = '';
    let hourlyforecastdate3 = '';



    for (j = 0; j < 24; j += 4) {

        for (i = 0; i < 1; i++) {
            let { forecastday } = data.forecast;

            hourlyforecastdate1 = `<div  class="hour-date" id="hour-date1">Hourly Forecast 
            ${window.moment(forecastday[i].date).format('DD-MM-YYYY')}</div>`
            hourlyforecastday1 += `<ul id="hour-container"><li>
            <img id="hourimage" src="images/64x64/day/${(forecastday[i].hour[j].condition.code)}.png">
            <div id="hourtext">${window.moment(forecastday[i].hour[j].time).format('HH:MM A')}
            <br>${(forecastday[i].hour[j].condition.text)}<br>${(forecastday[i].hour[j].feelslike_c)}°C
            <br>${(forecastday[i].hour[j].humidity)}%</div></li></ul>`;
        }
        hourcontainer1.innerHTML = hourlyforecastday1;
        hourdate1.innerHTML = hourlyforecastdate1;

        for (k = 1; k < 2; k++) {
            let { forecastday } = data.forecast;

            hourlyforecastdate2 = `<div  class="hour-date" id="hour-date2">Hourly Forecast 
            ${window.moment(forecastday[k].date).format('DD-MM-YYYY')}</div>`
            hourlyforecastday2 += `<ul id="hour-container"><li>
            <img id="hourimage" src="images/64x64/day/${(forecastday[k].hour[j].condition.code)}.png">
            <div id="hourtext">${window.moment(forecastday[k].hour[j].time).format('HH:MM A')}
            <br>${(forecastday[k].hour[j].condition.text)}<br>${(forecastday[k].hour[j].feelslike_c)}°C
            <br>${(forecastday[k].hour[j].humidity)}%</div></li></ul>`;
        }
        hourcontainer2.innerHTML = hourlyforecastday2;
        hourdate2.innerHTML = hourlyforecastdate2;

        for (m = 2; m < 3; m++) {
            let { forecastday } = data.forecast;

            hourlyforecastdate3 = `<div class="hour-date" id="hour-date3" >Hourly Forecast 
            ${window.moment(forecastday[m].date).format('DD-MM-YYYY')}</div>`
            hourlyforecastday3 += `<ul  id="hour-container"><li>
            <img id="hourimage" src="images/64x64/day/${(forecastday[m].hour[j].condition.code)}.png">
            <div id="hourtext">${window.moment(forecastday[m].hour[j].time).format('HH:MM A')}
            <br>${(forecastday[m].hour[j].condition.text)}<br>${(forecastday[m].hour[j].feelslike_c)}°C
            <br> ${(forecastday[m].hour[j].humidity)}%</div></li></ul>`;
        }

        hourcontainer3.innerHTML = hourlyforecastday3;
        hourdate3.innerHTML = hourlyforecastdate3;

    }

    Showfooter();
}
// 
// Show Footer TAg
function Showfooter() {
    footercontainer.style.display = 'inline';
}
