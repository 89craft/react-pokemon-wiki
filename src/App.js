import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Replaced HashRouter
import NavBar from './components/layout/NavBar';
import Dashboard from './components/layout/Dashboard';
//import SearchBar from './components/search/SearchBar';
import Pokemon from './components/pokemon/Pokemon';
import Ability from './components/ability/Ability';
import Type from './components/type/Type';
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
            { !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? ( // process.env.NODE_ENV !== 'production'
              <React.Fragment>
                <Route path="/pokemon/:index" caseSensitive={false} element={<Pokemon />} />
                <Route path="/ability/:index" caseSensitive={false} element={<Ability />} />
                <Route path="/type/:index" caseSensitive={false} element={<Type />} />
                <Route path="/" caseSensitive={false} element={<Dashboard />} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Route path="/react-pokemon-wiki/pokemon/:index" caseSensitive={false} element={<Pokemon />} />
                <Route path="/react-pokemon-wiki/ability/:index" caseSensitive={false} element={<Ability />} />
                <Route path="/react-pokemon-wiki/type/:index" caseSensitive={false} element={<Type />} />
                <Route path="/react-pokemon-wiki/" caseSensitive={false} element={<Dashboard />} />
              </React.Fragment>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}