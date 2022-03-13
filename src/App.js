import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Replaced HashRouter
import NavBar from './components/layout/NavBar'
import Dashboard from './components/layout/Dashboard'
import Pokemon from './components/pokemon/Pokemon'
import Ability from './components/ability/Ability'
import Type from './components/type/Type'
import NotFound from './NotFound'
import backgroundImage from './pattern.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { isProduction } from './helpers'

export default function App() {
	return (
		<Router>
			<div className="App" style={{ background: `url(${backgroundImage})` }}>
				<NavBar />
				<div className="container">
					<Routes>
						{isProduction() ? (
							<>
								<Route
									path="/react-pokemon-wiki/pokemon/:index"
									caseSensitive={false}
									element={<Pokemon />}
								/>
								<Route
									path="/react-pokemon-wiki/ability/:index"
									caseSensitive={false}
									element={<Ability />}
								/>
								<Route
									path="/react-pokemon-wiki/type/:index"
									caseSensitive={false}
									element={<Type />}
								/>
								<Route
									path="/react-pokemon-wiki/"
									caseSensitive={false}
									element={<Dashboard />}
								/>
								<Route element={<NotFound />} />
							</>
						) : (
							<>
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
								<Route path="/" caseSensitive={false} element={<Dashboard />} />
								<Route element={<NotFound />} />
							</>
						)}
					</Routes>
				</div>
			</div>
		</Router>
	)
	/* return (
		<Router basename={isProduction() ? '/react-pokemon-wiki' : ''}>
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
						<Route path="/" caseSensitive={false} element={<Dashboard />} />
						<Route element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</Router>
	) */
}
