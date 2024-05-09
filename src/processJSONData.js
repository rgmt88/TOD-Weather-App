import { getCurrentWeather, getForecast } from "./fetchData.js";

async function fetchDataAndLogWeather(location) {
    try {
        const currentWeatherData = await getCurrentWeather(location);

        const forecastData = await getForecast(location);

        // Store the data in variables for later use
        const locationName = currentWeatherData.location.name;
        const localTime = currentWeatherData.location.localTime;
        const tempInC = currentWeatherData.current.temp_c;
        const highTempInC = forecastData.forecast.forecastday[0].day.maxtemp_c;
        const minTempInC = forecastData.forecast.forecastday[0].day.mintemp_c;
        const tempInF = currentWeatherData.current.temp_f;
        const highTempInF = forecastData.forecast.forecastday[0].day.maxtemp_f;
        const minTempInF = forecastData.forecast.forecastday[0].day.mintemp_f;
        const tempCondition = currentWeatherData.current.condition.text;
        const windKph = currentWeatherData.current.wind_kph;
        const windMph = currentWeatherData.current.wind_mph;
        const humidity = currentWeatherData.current.humidity;

        console.log(highTempInC);

        // Get hourly forecast for the next 6 hours
        const hours = forecastData.forecast.forecastday[0].hour.slice(0,6)

    } catch (error) {
        console.error('Error:', error);
    }
}

fetchDataAndLogWeather('New York');