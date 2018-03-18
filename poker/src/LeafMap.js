import React, { PureComponent } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import Tourney from './Tourney'

const mapConfig = {
  center: [48.8260373, 2.34595850],
  zoom: 15.2
};

const iconSize = 100;

var myIcon = L.icon({
  iconUrl: require('./chip.svg'),
  iconSize: [iconSize, iconSize],
  iconAnchor: [iconSize/2, iconSize/2],
  popupAnchor: [0, -iconSize/2+iconSize/7]
});

const tourneys = [
  {position:[48.8257,2.3461], name:"L'Excuse", startTime:"19h30", day:"Mardi"},
  {position:[48.827256,2.348669], name:"Le Soyouz", startTime:"20h", day:"Lundi"}
];

export default class ReactLeafletMap extends PureComponent {
  handlePopupopen (e){
    var popupLatLng = e.popup.getLatLng();
    var mapBounds = this.getBounds();
    var offset = (mapBounds.getNorth()-mapBounds.getSouth())*0.4;
    var latlng = L.latLng(popupLatLng.lat+offset, popupLatLng.lng);
    this.setView(latlng, this.getZoom());
  }

  render() {
    return (
      <div className="map">
        <Map center={mapConfig.center} zoom={mapConfig.zoom} 
            className="map__reactleaflet" onPopupopen={this.handlePopupopen}>
          <TileLayer
            // when connected to wi-fi, put your computer's ip
            // url="http://192.168.1.5:8080/styles/osm-bright/{z}/{x}/{y}.png"
            url="http://localhost:8080/styles/osm-bright/{z}/{x}/{y}.png"
          />
          {
            [...tourneys].map((tourney,i) => <Tourney key={i}
                                                icon={myIcon} {...tourney}/>)
          }
        </Map>
      </div>
    );
  }
}