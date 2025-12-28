function WeatherCard({ weather }) {
    const temp = weather.main.temp;
    const iconCode = weather.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const isDay = iconCode.includes("d");

    let tempClass = "temp-normal";
    if (temp < 10) tempClass = "temp-cold";
    if (temp > 25) tempClass = "temp-hot";

    return (
        <div className="weather-card">
            <h2>{weather.name}</h2>

            <img
                src={iconUrl}
                alt={weather.weather[0].description}
                className={isDay ? "icon-day" : "icon-night"}
            />

            <p className={tempClass}>🌡️ {temp} °C</p>
            <p>{weather.weather[0].description}</p>
        </div>
    );
}

export default WeatherCard;