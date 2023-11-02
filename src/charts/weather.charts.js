// chart.js

const createWeatherChart = (container, data) => {
    const dateLabels = [];
    const tempData = [];
    const ville = document.getElementById('ville');
    const temp = document.getElementById('temp');
    const iconWeather = document.getElementById('iconWeather');
    const iconWeath = document.getElementsByClassName('iconWeath');
    const speed = document.getElementById('speed');
    const gust = document.getElementById('gust');
    const displayCpu = document.getElementById('displayCpu');
    const mainTemperature = document.getElementsByClassName('mainTemperature')[0];
    const buttonCpu = document.getElementById('buttonCpu');
    const buttonWeather = document.getElementById('buttonWeather');

    ville.innerText = data.city.name;
    temp.innerText = Math.round(data.list[0].main.temp) + ' °C';
    iconWeather.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@4x.png');
    speed.innerText = Math.round(data.list[0].wind.speed);
    gust.innerText = Math.round(data.list[0].wind.gust);
    function toggleDisplay() {

        if (displayCpu.style.display === "none") {
            displayCpu.style.display = 'block';
            mainTemperature.style.display = 'none';
            buttonWeather.style.background = 'none';
            buttonCpu.style.background = 'rgba(220, 220, 220, 0.8)';
        } else {
            displayCpu.style.display = 'none';
            mainTemperature.style.display = 'grid';
            buttonWeather.style.background = 'rgba(220, 220, 220, 0.8)';
            buttonCpu.style.background = 'none';
        }
    }

    buttonCpu.addEventListener('click', toggleDisplay);
    buttonWeather.addEventListener('click' ,toggleDisplay);



    for (let i = 0; i < iconWeath.length; i++) {
        iconWeath[i].setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@4x.png');
    }

    for (let i = 0; i < data.list.length; i++) {
        dateLabels.push(data.list[i].dt_txt);
        tempData.push(data.list[i].main.temp);
    }

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const temperatureData = {
        labels: dateLabels,
        datasets: [
            {
                label: 'Température extérieures (°C)',
                data: tempData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                pointRadius: 1,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                fill: true,
                borderWidth: 1
            },
        ],
    };

    return new Chart(ctx, {
        type: 'line',
        data: temperatureData,
        options: {
            responsive: true,
        },
    });
};

export default createWeatherChart;
