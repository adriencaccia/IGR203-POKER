import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './Homepage';
import GameDetails from './GameDetails';
import AddForm from './AddForm';
import Timer from './Timer';
import Profile from './Profile';
import MapComponent from './MapComponent';
import UserLogin from './UserLogin';
import UserLogout from './UserLogout';
import UserRegister from './UserRegister';

const Main = () => (
	<main className="main">
		<Switch>
			<Route exact path='/' component={Homepage} />
			<Route exact path='/map' component={MapComponent} />
			<Route exact path='/timer' component={Timer} />
			<Route exact path='/profile' component={Profile} />
			<Route exact path='/games/add' component={AddForm} />
			<Route exact path='/games/:id' component={GameDetails} />
			<Route exact path='/login' component={UserLogin} />
			<Route exact path='/register' component={UserRegister} />
			<Route exact path='/disconnect' component={UserLogout} />
		</Switch>
	</main>
)


export default Main;