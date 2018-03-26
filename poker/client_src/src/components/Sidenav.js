import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Sidenav extends Component{
	render(){
		return(
			<div className="sidenav-div">				
			    <a data-target="main-menu" className="btn-flat sidenav-trigger show-on-large"><i className="fa fa-bars"></i></a>
			    <ul className="sidenav" id="main-menu">
			    	<li><div className="brand-logo center">Menu</div></li>
				    <li><Link to='/'><i className="fa fa-search"/>Trouver une partie</Link></li>
				    <li><Link to='/games/add'><i className="fa fa-plus"/>Organiser une partie</Link></li>
				    <li><Link to='/timer'><i className="fa fa-caret-right"/>Gérer ma partie</Link></li>
				    <li><Link to='/profile'><i className="fa fa-users"/>Mon Profil</Link></li>
				    <li><Link to='/faq'><i className="fa fa-question-circle"/>FAQ</Link></li>
				    <li><Link to='/disconnect'><i className="fa fa-times"/>Se déconnecter</Link></li>
			    </ul>
			</div>
		)
	}

}

export default Sidenav;