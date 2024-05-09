import fs from 'fs';
import { getCurrentWeather, getForecast } from './fetchData.js';

function saveCurrentWeather(location, currentWeatherData) {
    try {
        const fileName = `${location}_current_weather.json`;
        const filePath = `./${fileName}`;
        fs.writeFileSync(filePath, JSON.stringify(currentWeatherData, null, 2));
        console.log(`Current weather data saved to ${fileName}`);
    } catch (error) {
        console.error('Error saving current weather data:', error);
    }
}

function saveForecast(location, forecastData) {
    try {
        const fileName = `${location}_forecast.json`;
        const filePath = `./${fileName}`;
        fs.writeFileSync(filePath, JSON.stringify(forecastData, null, 2));
        console.log(`Forecast data saved to ${fileName}`);
    } catch (error) {
        console.error('Error saving forecast data:', error);
    }
}

async function fetchDataAndSaveForecast(location) {
    try {
        const currentWeatherData = await getCurrentWeather(location);
        const forecastData = await getForecast(location);

        await saveCurrentWeather(location, currentWeatherData);
        await saveForecast(location, forecastData);
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchDataAndSaveForecast('New York');
