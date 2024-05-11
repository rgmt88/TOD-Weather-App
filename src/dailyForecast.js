import { getCurrentWeather, getForecast } from "./fetchData.js";

async function fetchDataAndProcess(location) {
    try {
        const currentWeatherData = await getCurrentWeather(location);
        const forecastData = await getForecast(location);

        await getNextThreeDayForecast(currentWeatherData, forecastData);
    } catch (error) {
        console.error('Error: ', error);
    }
}

async function getNextThreeDayForecast(currentWeatherData, forecastData) {
    try {
        // Loop through the forecast data for the next three days using .map
        const nextThreeDayForecast = forecastData.forecast.forecastday.slice(0, 3).map(dayData => {
            // Extract details from each day's data
            const {
                date,
                day: { condition: { text: conditionText, icon : relativeIconUrl }, maxtemp_c, maxtemp_f, mintemp_c, mintemp_f }
            } = dayData;  
            
            // Prefix 'https:' to the icon URL if it's not fully qualified
            const iconUrl = relativeIconUrl.startsWith('http') ? relativeIconUrl : `https:${relativeIconUrl}`;

            // Convert date to a Date object and get the abbreviated day of the week (first 3 characters)
            const dateObj = new Date(date + 'T00:00:00');
            const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(dateObj);

            // Return an object with the structure data for each day
            return {
                date,
                day: dayOfWeek,
                condition: conditionText,
                iconUrl: iconUrl,
                highTempInC: maxtemp_c,
                highTempInF: maxtemp_f,
                minTempInC: mintemp_c,
                minTempInF: mintemp_f
            };
        });
        
        // If required, you can lof or return the data
        console.log(nextThreeDayForecast);
        return nextThreeDayForecast;

    } catch (error) {
        console.error('Error: ', error);
    }
}

fetchDataAndProcess('New York');