import React, { PureComponent } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import Tourney from './Tourney';

const mapConfig = {
  center: [48.8260373, 2.34595850],
  zoom: 15.2
};

const iconSize = 70;

var myIcon = L.icon({
  iconUrl: require('./chip2s.svg'),
  iconSize: [iconSize, iconSize],
  iconAnchor: [iconSize/2, iconSize/2],
  popupAnchor: [0, -iconSize/2+iconSize/8]
});

class ReactLeafletMap extends PureComponent{
  constructor(props){
    super();
    this.handleZoom = this.handleZoom.bind(this);
    var arr = [];
    for (var i=0; i<props.tourneys.length; i++){
      arr.push(1);
    }
    this.state = {
      tourneys: props.tourneys,
      stacks: [],
      tourDisplayed: arr,
    };
  }

  handlePopupopen(e) {
    var popupLatLng = e.popup.getLatLng();
    var mapBounds = this.getBounds();
    var offset = (mapBounds.getNorth()-mapBounds.getSouth())*0.4;
    var latlng = L.latLng(popupLatLng.lat+offset, popupLatLng.lng);
    this.setView(latlng, this.getZoom());
  }

  handleZoom(e) {
    var tourneys = this.props.tourneys;
    // console.log(tourneys[2]);
    if (tourneys.length == 1) return;
    var map = e.target;

    function distanceBetween(t1, t2) {
      var l1 = L.latLng(tourneys[t1].position[0], tourneys[t1].position[1]);
      var l2 = L.latLng(tourneys[t2].position[0], tourneys[t2].position[1]);
      return l1.distanceTo(l2);
    }

    var centerPoint = map.containerPointToLatLng([0, 0]);
    var otherPoint = map.containerPointToLatLng([iconSize, iconSize]);
    var distance = centerPoint.distanceTo(otherPoint);

    for (var i=0; i<tourneys.length-1; i++){
      var distTourneys = distanceBetween(i,i+1);
      console.log(i,i+1,distance/1.2>distTourneys);
      //TODO implement this thing
      if (distance/1.2 > distTourneys){
        this.state.tourDisplayed[i] = 0;
        this.state.tourDisplayed[i+1] = 0;
        console.log(this.state.tourDisplayed);
        this.forceUpdate();
      }
      else {
        this.state.tourDisplayed[i] = 1;
        this.state.tourDisplayed[i+1] = 1;
        console.log(this.state.tourDisplayed);
        this.forceUpdate();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.tourneys = nextProps.tourneys;
    this.forceUpdate();
  }

  render() {
    return (
      <Map center={mapConfig.center} zoom={mapConfig.zoom} zoomControl={false}
          className="map__reactleaflet" onPopupopen={this.handlePopupopen}
          onZoom={this.handleZoom}>
        <ZoomControl position="topright"/>
        <TileLayer
          // when connected to wi-fi, put your computer's ip
          url="http://137.194.8.91:8080/styles/osm-bright/{z}/{x}/{y}.png"
          // url="http://localhost:8080/styles/osm-bright/{z}/{x}/{y}.png"
        />
        {
          [...this.state.tourneys].map((tourney,i) => <Tourney key={i}
                                              icon={myIcon} {...tourney}/>)
        }
      </Map>
    );
  }
}

export default ReactLeafletMap;