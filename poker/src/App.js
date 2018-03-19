import React, { Component } from 'react';
import './App.css';
import '../node_modules/leaflet/dist/leaflet.css';
import '../node_modules/semantic-ui-css/semantic.min.css';
import ReactLeafletMap from './LeafMap';
import DaySelection from './DaySelection';

const tourneys = [
  {position:[48.8257,2.3461], name:"L'Excuse", startTime:"19h30", day:"Mardi"},
  {position:[48.827256,2.348669], name:"Le Soyouz", startTime:"20h", day:"Lundi"},
  {position:[48.826122,2.343895], name:"La Porcherie", startTime:"23h", day:"Mercredi"}
];

const week = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

class App extends Component {
	constructor(){
    super();
    this.state = {
      tourneys: tourneys,
      height: 0,
      width: 0
    };
    this.updateMap = this.updateMap.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
		  <div className="App">
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

export default App;
