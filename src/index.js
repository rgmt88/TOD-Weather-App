import './style.css';
import { isValidLocation } from './validLocation.js';
import { fetchDataAndProcess } from './weatherDataProcessor.js';

document.getElementById('search-button').addEventListener('click', async () => {
    const locationInput = document.getElementById('location-input').value.trim();

    // Validate the input location
    if(isValidLocation(locationInput)) {
        // Call the fetchDataAndProcess function
        await fetchDataAndProcess(locationInput);
    } else {
        console.error('Invalid city or ZIP code. Please provide a valid location.');
    }
});