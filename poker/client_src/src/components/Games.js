import React, {Component} from 'react';
import axios from 'axios';
import GameItem from './GameItem'

class Games extends Component{
	constructor(){
		super();
		this.state = {
			games: []
		}
	}

	componentWillMount(){
		this.getGames();
	}

	getGames(){
		axios.get('http://localhost:3000/api/games').then(response => {
			this.setState({games: response.data}, () => {
				//console.log(this.state);
			})
		})
		.catch(err => console.log(err));
	}

	render(){
		const gameItems = this.state.games.map((game, i) => {
			return (
				<GameItem key={game.id} item={game}/>
			)
		});

		return(
			<div>
				<h1>Map Placeholder</h1>
				<ul className="collection">
					{gameItems}
				</ul>
			</div>
		)
	}

}

export default Games;