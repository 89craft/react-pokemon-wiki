import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import Dashboard from './components/layout/Dashboard'
import Pokemon from './components/pokemon/Pokemon'
import Ability from './components/ability/Ability'
import Type from './components/type/Type'
import Move from './components/move/Move'
import Generation from './components/generation/Generation'
import Berry from './components/berry/Berry'
import Item from './components/item/Item'
import NotFound from './components/layout/NotFound'
import ScrollToTop from './components/layout/ScrollToTop'
import backgroundImage from './pattern.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

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
						<Route
							path="/generation/:index"
							caseSensitive={false}
							element={<Generation />}
						/>
						<Route
							path="/berry/:index"
							caseSensitive={false}
							element={<Berry />}
						/>
						<Route
							path="/item/:index"
							caseSensitive={false}
							element={<Item />}
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
