import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
//impordime komponendid
import Countries from './components/countries';
import Cities from './components/cities';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			continents: []
		};
	}

	componentDidMount() {
		axios
			//Kasutame päringut, mis on määratud Praktika4_2
			.get('http://localhost:8000/api/continents')
			.then((res) => {
				this.setState({ continents: res.data.data });
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	//Renderisse lisame marsruudid
	render() {
		const { continents } = this.state;
		console.log(continents);
		return (
			<Router>
				<div className="App">
					<header>
						<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
							<a className="navbar-brand">World: </a>
							<button
								className="navbar-toggler"
								type="button"
								datatoggle="collapse"
								data-target="#navbarSupportedContent"
								ariacontrols="navbarSupportedContent"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span className="navbar-toggler-icon" />
							</button>
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav mr-auto">
									{continents.map((cont) => (
										<li className="nav-item">
											<Link className="nav-link" to={`/continent/${cont.continent}`}>
												{cont.continent}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</nav>
					</header>
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<Switch>
									<Route path="/continent/:cont" component={Countries} />
									<Route path="/country/:country_name" component={Cities} />
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</Router>
		);
	}
}
