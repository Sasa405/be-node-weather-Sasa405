




const axios = require('axios');
const dotenv = require('dotenv');
const colors = require('colors');  //npm install axios dotenv colors


// Umgebungsvariablen aus .env-Datei laden
dotenv.config();



// Stadtname und Maßeinheit aus Befehlszeilenargumenten abrufen
const cityName = process.argv[2];
const measurementUnit = process.argv[3] || 'c'; // Default to metric
                                                    //  Voreinstellung auf metrisch
                                                    
               
                                                    
// Prüfen, ob der Name der Stadt angegeben ist                                                    
if (!cityName) {
  console.error('Please provide a city name.');
  process.exit(1);
}


// API URL and parameters für das aktuelle Wetter
const currentApiUrl = 'https://api.weatherapi.com/v1/current.json';
const apiKey = process.env.API_KEY; // Hier wird der WeatherAPI key aus der .env abgerufen



// API URL und Parameter für die 5-Tage-Vorhersage
const forecastApiUrl = 'https://api.weatherapi.com/v1/forecast.json';


// API-Anfrage für das aktuelle Wetter
axios
  .get(currentApiUrl, {
    params: {
      key: apiKey,
      q: cityName,
      units: measurementUnit,
    },
  })
  .then(response => {
    const currentData = response.data.current;
    const city = response.data.location.name;
    const temperature = currentData.temp_c; // Für das metrische System, temp. in Celsius
    const conditions = currentData.condition.text;




    // Anzeige der aktuellen Wetterinformationen mit Farben
    console.log('\n@@@@@@@@@@@@@@@@@@@'.green);
    console.log('@ WEATHER PROGRAM @'.green);
    console.log('@@@@@@@@@@@@@@@@@@@\n'.green);

    console.log(`Current weather in ${city}:`);
    console.log(`Temperature: ${temperature}°${measurementUnit.toUpperCase()}`.yellow);
    console.log(`Conditions: ${conditions}\n` .yellow);
  })
  .catch(error => {
    console.error('An error occurred:', error.message.red);
  });



// API-Anfrage für die 5-Tage-Vorhersage
axios
  .get(forecastApiUrl, {
    params: {
      key: apiKey,
      q: cityName,
      days: 5,
      units: measurementUnit,
    },
  })
  .then(response => {
    const forecastData = response.data.forecast;


    // Anzeige der 5-Tage-Vorhersage mit Farben
    console.log('5-Day Forecast:'.cyan);
    forecastData.forecastday.forEach(day => {
      const date = day.date.blue;
      const maxTemp = day.day[`maxtemp_${measurementUnit}`];
      const minTemp = day.day[`mintemp_${measurementUnit}`];
      const conditions = day.day.condition.text.yellow;

      console.log(`${date}: Max: ${maxTemp}°${measurementUnit.toUpperCase()} | Min: ${minTemp}°${measurementUnit.toUpperCase()} | Conditions: ${conditions}`);
    });
  })
  .catch(error => {
    console.error('An error occurred while fetching the forecast:', error.message.red);
  });

























