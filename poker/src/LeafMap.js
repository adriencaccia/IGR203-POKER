import React, { PureComponent } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
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

const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `<img src=${require('./chip2_stacks.svg')} width=${iconSize*1.1}
            width=${iconSize*1.1}/>`,
    className: 'marker-cluster-custom',
    iconAnchor: [iconSize/2, iconSize/2],
  });
}

class ReactLeafletMap extends PureComponent{
  handlePopupopen(e) {
    var popupLatLng = e.popup.getLatLng();
    var mapBounds = this.getBounds();
    var offset = (mapBounds.getNorth()-mapBounds.getSouth())*0.4;
    var latlng = L.latLng(popupLatLng.lat+offset, popupLatLng.lng);
    this.setView(latlng, this.getZoom());
  }

  render() {
    return (
      <Map center={mapConfig.center} zoom={mapConfig.zoom} zoomControl={false}
          className="map__reactleaflet markercluster-map" onPopupopen={this.handlePopupopen}>
        <ZoomControl position="topright"/>
        <TileLayer
          // when connected to wi-fi, put your computer's ip
          // url="http://137.194.8.91:8080/styles/osm-bright/{z}/{x}/{y}.png"
          url="http://localhost:8080/styles/osm-bright/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}
          showCoverageOnHover={false}>
          {
            [...this.props.tourneys].map((tourney,i) => <Tourney key={i}
                                                icon={myIcon} {...tourney}/>)
          }
        </MarkerClusterGroup>
      </Map>
    );
  }
}

export default ReactLeafletMap;