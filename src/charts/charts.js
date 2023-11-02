// chart.js

const createChart = (container) => {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const temperatureData = {
        labels: [],
        datasets: [
            {
                label: 'Température CPU (°C)',
                data: [],
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
            scales: {
                y: {
                    min: 0, // Valeur minimale de l'axe Y
                    max: 100, // Valeur maximale de l'axe Y
                },
            },
        },
    });
};

export default createChart;
