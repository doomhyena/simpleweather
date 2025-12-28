import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";

function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDay, setIsDay] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);

    // Módosítás itt:
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    const fetchWeather = async (customCity) => {
        const cityName = typeof customCity === "string" ? customCity : city;
        const cityToSearch = cityName.trim();
        
        if (!cityToSearch) return;

        setLoading(true);
        setError(null);
        setWeather(null);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityToSearch)}&units=metric&lang=hu&appid=${API_KEY}`
            );

            if (!response.ok) {
                throw new Error("Nem található ilyen város");
            }

            const data = await response.json();
            const iconCode = data.weather[0].icon;

            setWeather(data);
            setCity(cityToSearch);
            setIsDay(iconCode.includes("d"));

            localStorage.setItem("lastCity", cityToSearch);

            setSearchHistory((prev) => {
                const updated = [
                    cityToSearch,
                    ...prev.filter((c) => c !== cityToSearch),
                ].slice(0, 5);

                localStorage.setItem(
                    "searchHistory",
                    JSON.stringify(updated)
                );
                return updated;
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedCity = localStorage.getItem("lastCity");
        if (savedCity) fetchWeather(savedCity);

        const savedHistory = JSON.parse(
            localStorage.getItem("searchHistory")
        );
        if (savedHistory) setSearchHistory(savedHistory);

        const savedDarkMode = localStorage.getItem("darkMode");
        if (savedDarkMode !== null) {
            setDarkMode(savedDarkMode === "true");
        }
    }, []);

    const clearSearchHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem("searchHistory");
    };

    return (
        <div className={`app ${isDay ? "day" : "night"} ${darkMode ? "dark" : ""}`}>
            <div className="card">
                <h1>🌤️ Időjárás App</h1>
                <button
                    className="theme-toggle"
                    onClick={() => {
                            const newValue = !darkMode;
                            setDarkMode(newValue);
                            localStorage.setItem("darkMode", newValue);
                        }}
                    >
                    {darkMode ? "Világos mód" : "Sötét mód"}
                </button>

                <SearchBar
                    city={city}
                    setCity={setCity}
                    onSearch={fetchWeather}
                    history={searchHistory}
                    onClearHistory={clearSearchHistory}
                />

                {loading && <Loader />}
                {error && <p className="error">{error}</p>}
                {weather && <WeatherCard weather={weather} />}
            </div>
        </div>
    );
}

export default App;
