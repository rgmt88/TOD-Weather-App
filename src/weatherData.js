export function fetchWeatherData(currentWeatherData, forecastData) {
    try {
        // Extract necessary details using object destructuring
        const {
            name: locationName,
            localtime: rawLocalTime
        } = currentWeatherData.location;
        
        // Extract and format local time to 'HH:MM'
        const date = new Date(rawLocalTime);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const localTime = `${hours}:${minutes}`;

        const {
            temp_c: tempInC,
            temp_f: tempInF,
            condition: { text: tempCondition, icon: relativeIconUrl },
            wind_kph: windKph,
            wind_mph: windMph,
            humidity
        } = currentWeatherData.current;
        
        // Add the 'http:' prefix to the relative icon URL if it is not fully qualified
        const iconUrl = relativeIconUrl.startsWith('http') ? relativeIconUrl : `https:${relativeIconUrl}`;

        const {
            maxtemp_c: highTempInC,
            maxtemp_f: highTempInF,
            mintemp_c: minTempInC,
            mintemp_f: minTempInF
        } = forecastData.forecast.forecastday[0].day;

        // Return weather data as a structured object
        return {
            locationName,
            localTime,
            tempInC,
            tempInF,
            tempCondition,
            iconUrl,
            windKph,
            windMph,
            humidity,
            highTempInC,
            highTempInF,
            minTempInC,
            minTempInF
        };

    } catch (error) {
        console.error(`Error: `, error);
        return null;
    }
}