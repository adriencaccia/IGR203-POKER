import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet';

class Tourney extends Component {
	render() {
		return (
			<Marker position={[this.props.position[0],this.props.position[1]]} 
					icon={this.props.icon} >
			  <Popup autoPan={false}>
			    <span>
			      {this.props.name} <br /> {this.props.startTime} {this.props.day}
			    </span>
			  </Popup>
			</Marker>
		);
	}
}

export default Tourney;