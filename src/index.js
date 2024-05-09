async function fetchDataAndLogWeather(location) {
    try {
        const currentWeatherData = await getCurrentWeather(location);

        const forecastData = await getForecast(location);

        // Store the data in variables for later use
        const locationName = currentWeatherData.location.name;
        const localTime = currentWeatherData.location.localTime;
        const tempInC = currentWeatherData.current.temp_c;
        const tempInF = currentWeatherData.current.temp_f;
        const tempCondition = currentWeatherData.current.condition.text;
        const windKph = currentWeatherData.current.wind_kph;
        const windMph = currentWeatherData.current.wind_mph;
        const humidity = currentWeatherData.current.humidity;

        console.log(forecastData);
        //console.log(forecastData.forecast.forecastday);
        

    } catch (error) {
        console.error('Error:', error);
    }
}

fetchDataAndLogWeather('New York');