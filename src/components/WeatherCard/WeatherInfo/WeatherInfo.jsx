function WeatherInfo({ weather, selectedDay }) {
    // Check if weather data is available
    if (!weather) {
        return <div>Loading weather data...</div>;
    }

    // Get the forecast for the selected day
    const forecastDay = weather.forecast.forecastday[selectedDay];
    
    return (
        <div className="card-content white-text">
        <span className="card-title">{weather.location.name}</span>
        <p>
            <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            />
        </p>
        <span className="temperature">
            {forecastDay.day.avgtemp_c}°
        </span>
        <div className="wind">
            Wind {forecastDay.day.maxwind_kph} km/h
        </div>
        </div>
    );
  }
  
  export default WeatherInfo;
  