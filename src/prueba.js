import { getCurrentWeather, getForecast } from "./fetchData.js";

async function fetchDataAndLogWeather(location) {
    try {
        const currentWeatherData = await getCurrentWeather(location);
        const forecastData = await getForecast(location);

        // Parse the local time and find the current hour
        const localTime = new Date(currentWeatherData.location.localtime);
        const currentHour = localTime.getHours();

        // Find the index to start from based on the current hour
        const startIndex = forecastData.forecast.forecastday[0].hour.findIndex(h => new Date(h.time).getHours() === currentHour);
        
        // Assuming there are enough hours left in the day, adjust if near day end
        const hoursToShow = forecastData.forecast.forecastday[0].hour.slice(startIndex, startIndex + 6);

        // Data structure for frontend
        const hourlyForecast = hoursToShow.map(hour => ({
            time: hour.time,
            tempC: hour.temp_c,
            tempF: hour.temp_f,
            condition: hour.condition.text,
            iconUrl: `https://${hour.condition.icon}`
        }));

        console.log(hourlyForecast);
        return hourlyForecast; // Return this data for use in frontend

    } catch (error) {
        console.error('Error:', error);
    }
}

fetchDataAndLogWeather('New York');
