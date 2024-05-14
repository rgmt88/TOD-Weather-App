export function updateCurrentWeatherInfo(current) {
    const weatherInfoDiv = document.getElementById('weather-info');
    document.getElementById('location-name').textContent = current.locationName;
    document.getElementById('temperature').textContent = `${current.tempInC}°`;
    document.getElementById('weather-conditions').textContent = current.tempCondition;
    document.getElementById('condition-icon').src = current.iconUrl;
    document.getElementById('high-low-temps').textContent = `H:${current.highTempInC}° L:${current.minTempInC}°`;

    // Make the weather info visible
    weatherInfoDiv.style.display = 'block';
}

export function updateHourlyForecast(hours) {
    const container = document.getElementById('hourly-items');
    container.innerHTML = '';

    hours.forEach(hour => {
        const hourDiv = document.createElement('div');
        hourDiv.className = 'hour-item';
        hourDiv.innerHTML = `
            <h4>${hour.time}</h4>
            <img src="${hour.iconUrl}" alt="Weather icon">
            <p>${hour.tempC}°</p>
        `;
        container.appendChild(hourDiv);
    });
}