import { getCurrentWeather, getForecast } from "./fetchData.js";
import { fetchWeatherData } from "./weatherData.js";
import { getNextSixHourForecast } from "./hourlyForecast.js";
import { getNextThreeDayForecast } from "./dailyForecast.js";

export async function fetchDataAndProcess(location) {
    try {
        const currentWeatherData = await getCurrentWeather(location);
        const forecastData = await getForecast(location);

        // Paralleliza fetching of different data types when possible
        const [current, hours, days] = await Promise.all([
            fetchWeatherData(currentWeatherData, forecastData),
            getNextSixHourForecast(currentWeatherData, forecastData),
            getNextThreeDayForecast(currentWeatherData, forecastData)
        ]);
        
        // Return the collected data
        return { current, hours, days };
    } catch (error) {
        console.error('Error: ', error);
        // Rethrow error if it needs to be handled further up the call stack
    }
}