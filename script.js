// Function to fetch weather data
async function fetchWeather(city) {
    const apiKey = "5735d34ee77d4d6680d104730241305";
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw new Error("Failed to fetch weather data");
    }
}

async function checkWeather(city) {
    try {
        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");

        searchBtn.addEventListener("click", async () => {
            const city = searchBox.value.trim();
            if (city) {
                const weatherData = await fetchWeather(city);
                document.querySelector(".city").innerHTML = weatherData.location.name;
                document.querySelector(".temp").innerHTML = Math.round(weatherData.current.temp_c) + "°C";
                document.querySelector(".wind").innerHTML = weatherData.current.wind_kph + "km/h";
                document.querySelector(".humidity").innerHTML = weatherData.current.humidity + "%";
                document.querySelector(".weather-icon").src = "https:" + weatherData.current.condition.icon;
                console.log(weatherData);
            } else {
                console.error("Please enter a city name");
            }
        });

        if (city) {
            const weatherData = await fetchWeather(city);
            document.querySelector(".city").innerHTML = weatherData.location.name;
            document.querySelector(".temp").innerHTML = weatherData.current.temp_c + "°C";
            document.querySelector(".wind").innerHTML = weatherData.current.wind_kph + "km/h";
            document.querySelector(".humidity").innerHTML = weatherData.current.humidity + "%";
            document.querySelector(".weather-icon").innerHTML = weatherData.current.condition.icon;
        }

    } catch (error) {
        console.error("Failed to fetch and display weather data:", error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const defaultCity = "Bethlehem";
    checkWeather(defaultCity);
});
