import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import Dashboard from './components/layout/Dashboard'
import Pokemon from './components/pokemon/Pokemon'
import Ability from './components/ability/Ability'
import Type from './components/type/Type'
import Move from './components/move/Move'
import ScrollToTop from './components/layout/ScrollToTop'
import NotFound from './components/layout/NotFound'
import backgroundImage from './pattern.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
// import { isProduction } from './helpers'

export default function App() {
	return (
		<Router>
			<div className="App" style={{ background: `url(${backgroundImage})` }}>
				<NavBar />
				<div className="container">
					<Routes>
						<Route
							path="/pokemon/:index"
							caseSensitive={false}
							element={<Pokemon />}
						/>
						<Route
							path="/ability/:index"
							caseSensitive={false}
							element={<Ability />}
						/>
						<Route
							path="/type/:index"
							caseSensitive={false}
							element={<Type />}
						/>
						<Route
							path="/move/:index"
							caseSensitive={false}
							element={<Move />}
						/>
						<Route path="/" caseSensitive={false} element={<Dashboard />} />
						<Route element={<NotFound />} />
					</Routes>
				</div>
				<ScrollToTop />
			</div>
		</Router>
	)
}
