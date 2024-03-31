import React, { useState } from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Details from './pages/details';
import './App.css';

function App() {
  

  return (
      <div>
        <Routes>
        <Route path="/weather-app-staj" element={ <Home/> } />
        <Route path="/weather-app-staj/:cityName" element={ <Details/> } />
      </Routes>
      </div>
  );
}

export default App;