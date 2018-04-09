import React, {Component} from 'react';

class Timer extends Component{

	render(){

		return(
			<div className="add-form">
        		<h1 className="app-header"> Ma partie en cours </h1> <br /> <br /> <br /> <br />
        		<p> BLINDES </p> <br />
				<p> "valeur blindes"  +  Timer </p> <br /> <br />
				<p> JOUEURS RESTANTS </p> <br />
				<p>liste joueurs </p> <br /> <br />
				<p> CLASSEMENT </p> <br />
				<p> joueurs éliminés </p>
      </div>


		)
	}

}

export default Timer;