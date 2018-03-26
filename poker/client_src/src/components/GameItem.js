import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class GameItem extends Component{
	constructor(props){
		super(props);
		this.state={
			item:props.item
		}
	}

	render(){
		return(
			<li className="collection-item">
				<Link to={`/games/${this.state.item.id}`}>{this.state.item.name}</Link>
			</li>
		)
	}
}

export default GameItem;