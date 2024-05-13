import './style.css';
import { isValidLocation } from './validLocation.js';
import { fetchDataAndProcess } from './weatherDataProcessor.js';
import { showLoadingState, hideLoadingState } from './loadingData.js';

document.getElementById('search-button').addEventListener('click', async () => {
    const locationInput = document.getElementById('location-input').value.trim();

    // Validate the input location
    if(isValidLocation(locationInput)) {
        try {
            // Show loading state to the user
            showLoadingState();

            // Call the fetchDataAndProcess function
            await fetchDataAndProcess(locationInput);
        } catch (error) {
            console.log('Error fetching data: ', error);
            alert('An error occurred while fetching the weather data. Please try again later.');
        } finally {
            // Hide loading state after the process
            hideLoadingState();
            // Clear the input box
            locationInput.value = '';
        }
    } else {
        alert('Invalid city or ZIP code. Please provide a valid location.');
    }
});

