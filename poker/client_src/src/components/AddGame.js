import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class AddGame extends Component{
	AddGame(newGame){
		axios.request({
			method:'post',
			url:'http://localhost:3000/api/games',
			data: newGame
		}).then(response => {
			this.props.history.push('/');
		}).catch(err => console.log(err));
		//console.log(newGame);
	}

	onSubmit(e){
		const newGame={
			name: this.refs.name.value,
			city: this.refs.city.value,
			address: this.refs.address.value,
			date: this.refs.date.value,
			time: this.refs.time.value,
			gameType: this.refs.gameType.value,
			difficulty: this.refs.difficulty.value,
			players: 0,
			maxPlayers: this.refs.maxPlayers.value
		};
		this.AddGame(newGame);
		e.preventDefault();

	}

	render(){
		return(
			<div>
				<br />
				<Link className="btn grey" to='/'>Back</Link>
				<h1>Add Game</h1>
				<form onSubmit={this.onSubmit.bind(this)}>
					<div className="row">
						<div className="input-field col s12">
							<input type="text" name="name" ref="name" />
							<label htmlFor="name">Name</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input type="text" name="city" ref="city" />
							<label htmlFor="city">City</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input type="text" name="address" ref="address" />
							<label htmlFor="address">Adresse</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s6">
							<input type="date" name="date" ref="date" />
							<label htmlFor="date">Date</label>
						</div>
						<div className="input-field col s6">
							<input type="time" name="time" ref="time" />
							<label htmlFor="time">Heure</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s4">
							<input type="text" name="gameType" ref="gameType" />
							<label htmlFor="gameType">Type</label>
						</div>
						<div className="input-field col s4">
							<input type="number" name="maxPlayers" ref="maxPlayers" />
							<label htmlFor="maxPlayers">Joueurs max</label>
						</div>
						<div className="input-field col s4">
							<input type="text" name="difficulty" ref="difficulty" />
							<label htmlFor="difficulty">Niveau</label>
						</div>
					</div>
					<input type="submit" value="save" className="btn" />
				</form>
			</div>
		)
	}
}


export default AddGame;