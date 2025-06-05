import { useState } from "react";
import "./WeatherApp.css"; // Import the CSS file

export const WeatherApp = () => {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchButton = async () => {
    setLoading(true);
    try {
      const resp = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=f24846ac75e34605ac8181007252805&q=${search}`
      );
      const data = await resp.json();
      setLoading(false);
      if (data.error) {
        alert("Failed to fetch weather data");
        setWeatherData(null);
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setLoading(false);
      console.error("Error fetching weather data:", err);
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-app">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={search}
          onChange={handleChange}
        />
        <button onClick={handleSearchButton}>Search</button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading data...</p>}

      {weatherData?.current && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};
