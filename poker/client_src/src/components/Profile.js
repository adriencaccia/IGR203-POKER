import React, {Component} from 'react';
import Token from './Token';
import APIManager from './APIManager';

class Profile extends Component{	
	constructor(props){
		super(props);
		this.state={
			user:{}
		};
		this.updateProfile();
	}

	updateProfile(){
		var prom = APIManager.getUserData();
		console.log(prom);
		if(prom.then !== undefined){
			prom.then(response => {
				this.setState({
					user:response.data
				});
			}).catch(err => {console.log(err)});
		}
	}

	render(){
		return(
			<div>
				<h1 className="app-header">Profile</h1>
				<p>{Token.get()}</p>
			</div>

		)
	}

}

export default Profile;