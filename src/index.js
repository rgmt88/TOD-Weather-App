import './style.css';
import { isValidLocation } from './validLocation.js';
import { fetchDataAndProcess } from './weatherDataProcessor.js';
import { showLoadingState, hideLoadingState } from './loadingData.js';
import { updateCurrentWeatherInfo, updateHourlyForecast } from './updateUI.js';

document.getElementById('search-button').addEventListener('click', async () => {
    // Get the input element
    const inputElement = document.getElementById('location-input');
    // Get the trimmed value
    const locationInput = inputElement.value.trim();

    // Validate the input location
    if(isValidLocation(locationInput)) {
        try {
            // Show loading state to the user
            showLoadingState();

            // Call the fetchDataAndProcess function
            const weatherData = await fetchDataAndProcess(locationInput);

            // Update UI with the fetched data
            updateCurrentWeatherInfo(weatherData.current);
            updateHourlyForecast(weatherData.hours);

            // Hide loading state after the process
            hideLoadingState();

        } catch (error) {
            console.log('Error fetching data: ', error);
            alert('An error occurred while fetching the weather data. Please try again later.');
        } finally {
            // Clear the input box
            inputElement.value = '';
        }
    } else {
        alert('Invalid city or ZIP code. Please provide a valid location.');
    }
});

