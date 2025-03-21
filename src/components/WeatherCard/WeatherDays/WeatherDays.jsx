import "./WeatherDays.css";

function WeatherDays({ days, selectedDay, onDayChange }) {
  if (!days.length) {
    return <div>Loading days...</div>;
  }

  // Get today's date in YYYY-MM-DD format
  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div className="card-action">
      {days.map((day, index) => {
        // If the day is today, display "Today", otherwise the weekday name
        const dayLabel =
          day.date === todayDate
            ? "Today"
            : new Date(day.date).toLocaleDateString("en-US", { weekday: "long" });
        return (
          <a
            key={day.date}
            href="#"
            className={selectedDay === index ? "active-day" : ""}
            onClick={(e) => {
              e.preventDefault();
              onDayChange(index);
            }}
          >
            {dayLabel}
          </a>
        );
      })}
    </div>
  );
}

export default WeatherDays;
