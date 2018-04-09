import React, {Component} from 'react';
import Token from './Token';
import APIManager from './APIManager';

class Profile extends Component{	
	

	render(){
		var user=APIManager.getUserData();
		console.log(user);
		return(
			<div>
				<h1>Profile Placeholder</h1>
				<p>{Token.get()}</p>
			</div>

		)
	}

}

export default Profile;