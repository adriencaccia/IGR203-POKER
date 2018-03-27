import React, { Component } from 'react';
import axios from 'axios';
import './MapComponent.css';
import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/semantic-ui-css/semantic.min.css';
import ReactLeafletMap from './LeafMap';
import DaySelection from './DaySelection';
import '../../node_modules/react-leaflet-markercluster/dist/styles.min.css';

const tourneys = require('../bars.json').bars;

const week = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

class MapComponent extends Component {
	constructor(){
    super();
    this.state = {
      tourneys: tourneys,
      games: [],
      height: 0,
      width: 0
    };
    this.updateMap = this.updateMap.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount(){
    this.getGames();
  }

  getGames(){
    axios.get('http://localhost:3000/api/games').then(response => {
      this.setState({games: response.data});
      console.log(this.state);
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

	updateMap(e, data) {
	  var dayArray = data.value;
	  if (dayArray.length === 0){
	    dayArray = week;
	  }
	  this.setState({
	      tourneys : tourneys.filter(tourney => dayArray.includes(tourney.day)),
	    }); 
	}

  render() {
		return (
		  <div className="map-component">
				<div className="map-view">
				  <DaySelection updateMap={this.updateMap}/>
				  <div className="map">
				    <ReactLeafletMap tourneys={this.state.tourneys}/>
				  </div>
				</div>
		  </div>
		);
  }
}

export default MapComponent;
