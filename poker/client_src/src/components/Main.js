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

class Main extends Component {
	render(){
		return(
			<main className="main">
				<Switch>
					<Route exact path='/' render={()=><MapComponent/>} />
					<Route exact path='/faq' render={()=><About/>} />
					<Route exact path='/timer' render={()=><Timer/>} />
					<Route exact path='/profile' render={()=><Profile/>} />
					<Route exact path='/games/add' render={()=><AddForm/>} />
					<Route exact path='/games/:id' render={()=><GameDetails/>} />
					<Route exact path='/login' render={()=><UserLogin/>} />
					<Route exact path='/register' render={()=><UserRegister/>} />
				</Switch>
			</main>
		);
	}
}


export default Main;