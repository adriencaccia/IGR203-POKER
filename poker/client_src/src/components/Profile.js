import React, {Component} from 'react';
import Token from './Token';

class Profile extends Component{

	render(){
		return(
			<div>
				<h1>Profile Placeholder</h1>
				<p>{Token.get()}</p>
			</div>
		)
	}

}

export default Profile;