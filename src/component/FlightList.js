 import React, { useState, useEffect } from 'react';

function FlightList() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch('/api/flights');
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        console.error(error);
      }
    };

   // fetchFlights();

    const intervalId = setInterval(() => {
      fetchFlights();
    }, 10000); // Update every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Flight Details</h1>
      <table>
        <thead>
          <tr>
            <th>Flight No</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Gate No</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index}>
              <td>{flight.flightNo}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.arrivalTime}</td>
              <td>{flight.gateNo}</td>
              <td>{flight.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FlightList;