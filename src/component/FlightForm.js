import React, { useState } from 'react';

function FlightForm () {
  const [flightNo, setFlightNo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [gateNo, setGateNo] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const flightData = {
      flightNo,
      departureTime: new Date(departureDate).toISOString(),
      arrivalTime: new Date(arrivalDate).toISOString(),
      gateNo,
      status,
    };

    try {
      const response = await fetch('http://localhost:8080/api/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flightData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Flight status submitted successfully!');
        console.log(result);
      } else {
        alert('Failed to submit flight status');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting flight status');
    }
  };

  return (
    <div>
      <h2>Submit Flight Updated Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="flightNo">Flight No:</label>
          <input
            type="text"
            id="flightNo"
            value={flightNo}
            onChange={(e) => setFlightNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="departureDate">Departure Date:</label>
          <input
            type="datetime-local"
            id="departureDate"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="arrivalDate">Arrival Date:</label>
          <input
            type="datetime-local"
            id="arrivalDate"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="gateNo">Gate No:</label>
          <input
            type="text"
            id="gateNo"
            value={gateNo}
            onChange={(e) => setGateNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FlightForm;
