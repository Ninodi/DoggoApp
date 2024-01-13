import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import AllBreedsPage from './pages/AllBreedsPage';
import BreedDetailsPage from './pages/BreedDetailsPage';
import { useState } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<LogInPage />}/>
        <Route path="/allBreeds" element={<AllBreedsPage />}/>
        <Route path="/allBreeds/:breedName" element={<BreedDetailsPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
