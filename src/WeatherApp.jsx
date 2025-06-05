import { useState } from "react";

export const WeatherApp = () => {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading,setLoading]=useState(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchButton = async () => {
    setLoading(true);
    try {
      const resp = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${"f24846ac75e34605ac8181007252805"}&q=${search}`
      );
      const data = await resp.json();
      console.log(data);
      setLoading(false)
      setWeatherData(data);
      if(data.error){
        alert("Failed to fetch weather data")
      }
    } catch (err) {
      setLoading(false)
      console.error("Error fetching weather data:", err);
      setWeatherData(null);
      
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={search}
          onChange={handleChange}
          style={{ width: "200px", height: "30px", marginRight: "5px" }}
        />
        <button
          type="button"
          onClick={handleSearchButton}
          style={{
            width: "80px",
            height: "35px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Search
        </button>
      </div>

      {
        loading && <p style={{textAlign:"center"}}>Loading data…</p>
      }

      {weatherData?.current && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "60px",
            marginTop: "100px",
          }}
        >
        <div style={boxStyle}>
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div style={boxStyle}>
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div style={boxStyle}>
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          
          
          <div style={boxStyle}>
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

const boxStyle = {
  width: "220px",
  height: "120px",
  border: "1px solid black",
  textAlign: "center",
  paddingTop: "10px",
};
