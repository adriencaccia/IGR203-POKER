import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './About';
import GameDetails from './GameDetails';
import AddForm from './AddForm';
import Timer from './Timer';
import Profile from './Profile';
import MapComponent from './MapComponent';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';

const Main = () => (
	<main className="main">
		<Switch>
			<Route exact path='/' component={MapComponent} />
			<Route exact path='/faq' component={About} />
			<Route exact path='/timer' component={Timer} />
			<Route exact path='/profile' component={Profile} />
			<Route exact path='/games/add' component={AddForm} />
			<Route exact path='/games/:id' component={GameDetails} />
			<Route exact path='/login' component={UserLogin} />
			<Route exact path='/register' component={UserRegister} />
		</Switch>
	</main>
)


export default Main;