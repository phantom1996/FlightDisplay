// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import FlightForm from './component/FlightForm';
import FlightList from './component/FlightList';
import './App.css';
const App = () => {
  return (
    <Router>
      <div className="content">
        <Navbar />
        <Routes>
          <Route path="/" element={<FlightList />} />
          <Route path="/update-flight" element={<FlightForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
