import React, { PureComponent } from 'react';
import { Map, TileLayer, ZoomControl, MapControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import TourneyConfirm from './TourneyConfirm';

// const TILES_URL = "http://localhost:8080/styles/poker-style/{z}/{x}/{y}.png";
// const TILES_URL = "http://192.168.1.5:8080/styles/poker-style/{z}/{x}/{y}.png";
// const TILES_URL = "http://137.194.8.91:8080/styles/osm-bright/{z}/{x}/{y}.png";
// const TILES_URL = "http://192.168.137.99:8080/styles/osm-bright/{z}/{x}/{y}.png";
const TILES_URL = "https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png";

const iconSize = 60;

var myIcon = L.icon({
  iconUrl: require('../icons/EXPORTS/SVG/poker_ROUGE-01.svg'),
  iconSize: [iconSize, iconSize],
  iconAnchor: [iconSize/2, iconSize/2],
  popupAnchor: [0, -iconSize / 2 + iconSize / 8]
});

const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `<img src=${require('../icons/EXPORTS/SVG/poker_ROUGE-02.svg')}
            width=${iconSize*1.1}/>`,
    className: 'marker-cluster-custom',
    iconAnchor: [iconSize/2, iconSize/2],
  });
}

class ReactLeafletMap extends PureComponent{
  constructor(props) {
    super(props);
    this.handleMoveEnd = this.handleMoveEnd.bind(this);
  }

  handlePopupopen(e) {
    console.log(e);
    var fromZoom = this.getZoom();
    var toZoom = 17;
    var scale = this.getZoomScale(toZoom, fromZoom);
    if (scale < 1){
      scale = 1;
      toZoom = fromZoom;
    }
    var popupLatLng = e.popup.getLatLng();
    var mapBounds = this.getBounds();
    var offset = (mapBounds.getNorth()-mapBounds.getSouth())*0.4;
    var latlng = L.latLng(popupLatLng.lat+offset/scale, popupLatLng.lng);
    this.setView(latlng, toZoom);
  }

  handlePopupclose(e) {

  }

  handleMoveEnd(e) {
    var newBounds = e.target.getBounds();
    this.props.changeBounds(newBounds);
  }

  render() {
    return (
      <Map ref={m => {this.leafletMap=m;}}
        zoomControl={false}
        className="map__reactleaflet markercluster-map"
        onPopupopen={this.handlePopupopen}
        onPopupclose={this.handlePopupclose}
        attributionControl={false}
        useFlyTo={true}
        bounds={this.props.bounds}
        // onViewportChanged={this.handleMove}
        onMoveEnd={this.handleMoveEnd}
        >
        {/* <ZoomControl position="topright" /> */}
        <TileLayer url={TILES_URL} detectRetina={true}/>
        <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}
          showCoverageOnHover={false}>
          {
            [...this.props.tourneys].map((tourney,i) => <TourneyConfirm key={i}
                icon={myIcon} {...tourney}
                leafletMap={this.leafletMap}
              />)
          }
        </MarkerClusterGroup>
      </Map>
    );
  }
}

export default ReactLeafletMap;