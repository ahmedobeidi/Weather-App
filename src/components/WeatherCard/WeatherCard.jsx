import WeatherDays from "./WeatherDays/WeatherDays";
import WeatherInfo from "./WeatherInfo/WeatherInfo";
import "./WeatherCard.css";
import { useState, useEffect } from "react";

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0); // Default to first day
  const [searchCity, setSearchCity] = useState("Saint-Etienne"); // initial city
  const [query, setQuery] = useState("Saint-Etienne");

  async function getData(city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=5&aqi=no&alerts=no`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setWeather(json);
      setSelectedDay(0); // reset to first day on new search
    } catch (error) {
      console.error(error.message);
    }
  }

  // Fetch weather data on initial mount
  useEffect(() => {
    getData(query);
  }, [query]);

  function handleSearch(e) {
    e.preventDefault();
    // When search is submitted, update query state which triggers useEffect
    setQuery(searchCity);
  }

  // Safely extract forecast days if weather data is loaded
  const forecastDays = weather?.forecast?.forecastday || [];

  return (
    <div className="weather card darken-1">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="Enter city"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <WeatherInfo weather={weather} selectedDay={selectedDay} />
      <WeatherDays
        days={forecastDays}
        selectedDay={selectedDay}
        onDayChange={setSelectedDay}
      />
    </div>
  );
}

export default WeatherCard;
