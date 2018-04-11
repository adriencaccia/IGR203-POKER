import React, {Component} from 'react';

class Timer extends Component{

	playersInGame = ["Daniel", "José", "Pamela", "Patricia", "", ""];
	playersOut = ["", "", "", "", "Georges", "James"];
	//timer = 300;




	render(){

		//setTimeout(timer--, 1000);

		return(
			<div className="add-form">
        		<h1 className="app-header"> Ma partie en cours </h1> <br /> <br /> <br /> <br />
 				
 				<h2> Blindes </h2> <br />
				<p> "valeur blindes"  +  Timer {seconds} </p> <br /> <br />
				
				<h2> Joueurs Restants </h2> <br />
				<button>{this.playersInGame[0]}</button> <button>{this.playersInGame[1]}</button> <button>{this.playersInGame[2]}</button> <br />
				<button>{this.playersInGame[3]}</button> <button>{this.playersInGame[4]}</button> <button>{this.playersInGame[5]}</button> <br /><br />
				
				<h2> Classement </h2> <br />
				<tr><td>1. {this.playersOut[0]}</td>
  					<td>2. {this.playersOut[1]}</td>
  					<td>3. {this.playersOut[2]}</td> </tr>
  				<tr><td>4. {this.playersOut[3]}</td>
  					<td>5. {this.playersOut[4]}</td>
  					<td>6. {this.playersOut[5]}</td> </tr>
      </div>


		)
	}

}

export default Timer;