import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component{
	render(){
		return(
			<div>
				<nav className="blue darkened-3">
				    <div className="nav-wrapper">
				      <a href="/" className="brand-logo"></a>
				      <a data-target="main-menu" className="sidenav-trigger show-on-large"><i className="fa fa-bars"></i></a>
				      <ul className="right hide-on-med-and-down">
				        <li><Link to='/'><i className="fa fa-users"/>Games</Link></li>
				      </ul>
				      <ul className="sidenav" id="main-menu">
				        <li><Link to='/'><i className="fa fa-users"/>Games</Link></li>
				        <li><Link to='/games/add'><i className="fa fa-plus"/>Add Games</Link></li>
				        <li><Link to='/about'><i className="fa fa-question-circle"/>About</Link></li>

				      </ul>
				    </div>
			  	</nav>
			</div>
		)
	}

}

export default Navbar;