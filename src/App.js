import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Replaced HashRouter
import NavBar from './components/layout/NavBar';
import Dashboard from './components/layout/Dashboard';
//import SearchBar from './components/search/SearchBar';
import Pokemon from './components/pokemon/Pokemon';
import backgroundImage from './pattern.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="App" style={{ background: `url(${backgroundImage})` }}>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/pokemon/:pokemonIndex" caseSensitive={false} element={<Pokemon />} />
            <Route path="/" caseSensitive={false} element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}