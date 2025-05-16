import React, { useState } from "react";
import axios from "axios";
import "../styles/TableSelection.css";

const TableSelection = ({ selectedRestaurant }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [availableTables, setAvailableTables] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checkAvailability = async () => {
    if (!date || !time || !numberOfGuests) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/restaurants/check-availability",
        { restaurantId: selectedRestaurant, date, time, numberOfGuests }
      );

      if (Array.isArray(response.data)) {
        setAvailableTables(response.data);
      } else {
        setAvailableTables([]);
      }
    } catch (err) {
      setError("Error checking table availability", err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const makeReservation = async (tableNumber) => {
    try {
      await axios.post("http://localhost:5000/api/restaurants/reserve-table", {
        restaurantId: selectedRestaurant,
        tableNumber,
        date,
        time,
        numberOfGuests,
      });
      alert("Reservation successful");
    } catch (err) {
      setError("Error making reservation");
    }
  };

  return (
    <div className="table-selection-container">
      <h2 className="table-selection-title">Check Table Availability</h2>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="time">Time</label>
        <input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="guests">Number of Guests</label>
        <input
          id="guests"
          type="number"
          placeholder="Number of Guests"
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(e.target.value)}
        />
      </div>
      <button className="check-availability-button" onClick={checkAvailability} disabled={loading}>
        {loading ? "Checking..." : "Check Availability"}
      </button>

      {error && <p className="error-message">{error}</p>}

      <h3 className="available-tables-title">Available Tables</h3>
      {availableTables.length > 0 ? (
        availableTables.map((table) => (
          <div key={table.tableNumber} className="table-card">
            <p>Table Number: {table.tableNumber}</p>
            <button
              className="reserve-button"
              onClick={() => makeReservation(table.tableNumber)}
            >
              Reserve Table
            </button>
          </div>
        ))
      ) : (
        <p className="no-tables-message">
          {loading ? "" : "No available tables for the selected time."}
        </p>
      )}
    </div>
  );
};

export default TableSelection;
