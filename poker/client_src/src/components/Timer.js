import React, {Component} from 'react';

class Timer extends Component{

	render(){

		return(
			<div>
        <h1 style={{textAlign:'center'}}>
          Ma partie de Poker en cours
        </h1> <br /> <br /> <br />
        
        <button> clique ici pour gagner 1000 € </button>
        <br />

        <table>
        	<tr>
  				<td>Bonjour, je suis votre première cellule </td>
 				<td>je suis votre deuxième cellule </td>
				<td>je suis votre troisième cellule </td>
				<td>je suis votre quatrième cellule </td>
			</tr>
			<tr>
  				<td>Bonjour, je suis votre première cellule </td>
 				<td>je suis votre deuxième cellule </td>
				<td>je suis votre troisième cellule </td>
				<td>je suis votre quatrième cellule </td>
			</tr>
        </table>
		<br />
		<br /> <span> Blindes </span> <br />
		"valeur blindes"  +  Timer <br />
		<br /><span> Joueurs restants </span> <br />
		liste joueurs <br />
		<br /><span> classement </span> <br />
		<br />
		<br />
		COUCOU TEY :3


      </div>


		)
	}

}

export default Timer;