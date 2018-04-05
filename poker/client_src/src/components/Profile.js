import React, {Component} from 'react';

class Profile extends Component{
	test = () => {return "123456";};


	render(){
		var tokenId=this.props.getTokenId();
		console.log(tokenId);
		return(
			<div>
				<h1>Profile Placeholder</h1>
				<p>{tokenId}</p>
			</div>
		)
	}

}

export default Profile;