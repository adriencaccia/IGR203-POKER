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
import UserTourneys from './UserTourneys';
import APIManager from './APIManager';

const Main = () => {
	const isLogged = APIManager.getUser() != "0";
	return (
    <main className="main">
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/map' component={MapComponent} />
        <Route exact path='/timer' component={Timer} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/games/add' component={AddForm} />
        <Route exact path='/games/:id' component={GameDetails} />
        <Route exact path='/disconnect' component={UserLogout} />
        <Route exact path='/tourneys' component={UserTourneys} />
        {/* <Route exact path='/map' component={isLogged ? MapComponent : Homepage} />
        <Route exact path='/timer' component={isLogged ? Timer : Homepage} />
        <Route exact path='/profile' component={isLogged ? Profile : Homepage} />
        <Route exact path='/profile' component={isLogged ? Profile : Homepage} />
        <Route exact path='/games/add' component={isLogged ? AddForm : Homepage} />
        <Route exact path='/games/:id' component={isLogged ? GameDetails : Homepage} />
        <Route exact path='/disconnect' component={isLogged ? UserLogout : Homepage} />
        <Route exact path='/tourneys' component={isLogged ? UserTourneys : Homepage} /> */}
        <Route exact path='/login' component={UserLogin} />
        <Route exact path='/register' component={UserRegister} />
      </Switch>
    </main>
	)
}


export default Main;