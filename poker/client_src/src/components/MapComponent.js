import React, { Component } from 'react';
import axios from 'axios';
import './MapComponent.css';
import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/semantic-ui-css/semantic.min.css';
import ReactLeafletMap from './LeafMap';
import DaySelection from './DaySelection';
import { Button, Icon } from 'semantic-ui-react';
import '../../node_modules/react-leaflet-markercluster/dist/styles.min.css';
import L from 'leaflet';
import APIManager from './APIManager';

const mapConfig = {
  centerParis: [48.856614, 2.352222],
  playerPos: [48.8260373, 2.34595850],
};
const playerBounds = L.latLngBounds([mapConfig.playerPos.map((i) => i - 0.003),
  mapConfig.playerPos.map((i) => i + 0.003)]);
const defaultBounds = L.latLngBounds([mapConfig.centerParis.map((i) => i - 0.05),
  mapConfig.centerParis.map((i) => i + 0.05)]);

function tourneysToBounds(tourneys) {
  if (tourneys.length == 0){
    return defaultBounds;
  }
  if (tourneys.length == 1){
    return L.latLngBounds([tourneys[0].position.map((i) => i - 0.04), 
      tourneys[0].position.map((i) => i + 0.04)]);
  }
  return L.latLngBounds(tourneys.map((tourney) => tourney.position)
  .map((bound) => L.latLng(bound)));
}

//const tourneys = require('../bars.json').bars;

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
      tourneys: [],
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
    APIManager.getTourneys().then(response => {
      this.setState({tourneys: response.data});
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
    APIManager.getTourneys().then(response => {
      var allTourneys = response.data;
      var newTourneys = allTourneys.filter(tourney => dayArray.includes(tourney.date));
      var newBounds = tourneysToBounds(newTourneys);
      this.setState({
        tourneys: newTourneys,
      });
      this.leafletMap.leafletMap.leafletElement.closePopup();
      this.leafletMap.changeBounds(newBounds);
    }).catch(err => console.log(err));
  }
  
  render() {
		return (
		  <div className="map-component">
				<div className="map-view">
				  <DaySelection updateMap={this.updateMap}/>
          <Button icon compact
            size="massive"
            className="position-button"
            onClick={() => {
              this.leafletMap.changeBounds(playerBounds);
              this.leafletMap.leafletMap.leafletElement.closePopup();
            }}>
            <Icon
              className="navbar-button-icon"
              name="location arrow"
            />
          </Button>
				  <div className="map">
				    <ReactLeafletMap ref={m => {this.leafletMap=m;}}
              tourneys={this.state.tourneys}
            />
				  </div>
				</div>
		  </div>
		);
  }
}

export default MapComponent;
