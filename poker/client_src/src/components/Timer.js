import React, {Component} from 'react';

class Timer extends Component{

	playersInGame = ["Daniel", "José", "Pamela", "Patricia", "", ""];
	playersOut = ["", "", "", "", "Georges", "James"]



    getInitialState(){

        // This is called before our render function. The object that is 
        // returned is assigned to this.state, so we can use it later.

        return { elapsed: 0 };
    }

    componentDidMount(){

        // componentDidMount is called by react when the component 
        // has been rendered on the page. We can set the interval here:

        this.timer = setInterval(this.tick, 50);
    }

    componentWillUnmount(){

        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:

        clearInterval(this.timer);
    }

    tick(){

        // This function is called every 50 ms. It updates the 
        // elapsed counter. Calling setState causes the component to be re-rendered

        this.setState({elapsed: new Date() - this.props.start});
    }



	render(){

		var elapsed = Math.round(this.state.elapsed / 100);
		var seconds = (elapsed / 10).toFixed(1);

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