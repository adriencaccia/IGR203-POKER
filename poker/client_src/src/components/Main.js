import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Games from './Games';
import About from './About';
import GameDetails from './GameDetails';
import AddForm from './AddForm';
import Timer from './Timer';
import Profile from './Profile';
import MapComponent from './MapComponent';

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={MapComponent} />
			<Route exact path='/faq' component={About} />
			<Route exact path='/timer' component={Timer} />
			<Route exact path='/profile' component={Profile} />
			<Route exact path='/games/add' component={AddForm} />
			<Route exact path='/games/:id' component={GameDetails} />
		</Switch>
	</main>
)

export default Main;