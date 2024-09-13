const apiKey = "a05a93aab91d66366c08c128198d31c5";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector("#icon");

async function checkWeather(city) {
    const response = await fetch(`${apiurl}${city}&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
        if (data.weather[0].main == "Clouds") {
            weatherIcon.setAttribute("class","fas fa-cloud-showers-heavy weather-icon");
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.setAttribute("class","fas fa-sun weather-icon");
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.setAttribute("class","fas fa-bolt weather-icon");
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.setAttribute("class","fas fa-cloud-rain weather-icon");
        }
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});


checkWeather("Udupi");
