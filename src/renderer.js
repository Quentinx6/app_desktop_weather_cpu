// renderer.js

import createChart from './charts/charts.js';
import getWeatherData from './weather/weather.js';
import createWeatherChart from "./charts/weather.charts.js";

const weather = document.getElementById('weather');
const cpu = document.getElementById('cpu');
const temperatureChart = createChart(cpu);
const input = document.getElementsByTagName('input')[0];
let value = input.value;

input.addEventListener('keyup', () => {
  value = input.value
})

const addDataPoint = async () => {
  try {
    const response = await window.versions.getCpuTemperature();
    const now = new Date().toLocaleTimeString();

    temperatureChart.data.labels.push(now);
    temperatureChart.data.datasets[0].data.push(response.main);

    temperatureChart.update();

    if (temperatureChart.data.labels.length > 6) {
      temperatureChart.data.labels.shift();
      temperatureChart.data.datasets[0].data.shift();
    }

    if (response.main > value) {
      await window.versions.showNotification('Température élevée', `La température du CPU est de plus de ${value}°C.`);
    }
  } catch (error) {
    console.error(error);
    weather.innerText = 'Erreur lors de la récupération de la température CPU';
  }
};

// Récupérez les données météo
const weatherData = await getWeatherData();
createWeatherChart(weather, weatherData);

setInterval(addDataPoint, 5000);
addDataPoint();
