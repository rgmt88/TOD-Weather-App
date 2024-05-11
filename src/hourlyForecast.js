import { getCurrentWeather, getForecast } from "./fetchData.js";

async function getNextSixHourForecast(location) {
    try {
        const currentWeatherData = await getCurrentWeather(location);
        const forecastData = await getForecast(location);

        // Parse the local time and find the current hour
        const localTime = new Date(currentWeatherData.location.localtime);
        const currentHour = localTime.getHours();

        // Determine start index and how many hours to fetch from today's forecast
        const startIndex = currentHour;
        const hoursLeftToday = 24 - startIndex;
        let hoursToShow;

        if (hoursLeftToday >= 6) {
            // If there are enough hours left in the day, slice the next 6 hours
            hoursToShow = forecastData.forecast.forecastday[0].hour.slice(startIndex, startIndex + 6);
        } else {
            // If not, take what's left today and the rest from the next day
            const hoursToday = forecastData.forecast.forecastday[0].hour.slice(startIndex, 24);
            const hoursTomorrow = forecastData.forecast.forecastday[1].hour.slice(0, 6 - hoursLeftToday);
            hoursToShow = hoursToday.concat(hoursTomorrow);
        }

        // Data structure for frontend
        const hourlyForecast = hoursToShow.map(hour => {
            // Convert the string to a Date object
            const date = new Date(hour.time);
            // Extract the hour
            const formattedHour = date.getHours();

            return {
                time: `${formattedHour}:00`,
                tempC: hour.temp_c,
                tempF: hour.temp_f,
                condition: hour.condition.text,
                iconUrl: `https:${hour.condition.icon}`    
            }
        });

        console.log(hourlyForecast);
        return hourlyForecast; // Return this data for use in frontend

    } catch (error) {
        console.error('Error:', error);
    }
}

getNextSixHourForecast('New York');
