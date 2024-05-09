async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const API_KEY = '1766e056714042da95a203208242604';

export async function getCurrentWeather(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;
    return await fetchData(url);
}

export async function getForecast(location) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3`;
    return await fetchData(url);
}