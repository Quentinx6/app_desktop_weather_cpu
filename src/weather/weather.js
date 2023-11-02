const getWeatherData = async () => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=50.725231&lon=1.613334&appid=625fe2049e5ff7a87b1e6af4c79b6bed&units=metric`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des données météo', error);
        return null;
    }
};

export default getWeatherData;
