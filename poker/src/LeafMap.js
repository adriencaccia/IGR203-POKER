import React, { Component, PureComponent } from 'react';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';

const mapConfig = {
  center: [48.8260373, 2.34595850],
  zoom: 12.2
};

export default class ReactLeafletMap extends PureComponent {

  render() {
    return (
      <div className="map">
        <Map center={mapConfig.center} zoom={mapConfig.zoom} className="map__reactleaflet">
          <TileLayer
            url="http://localhost:8080/styles/positron/{z}/{x}/{y}.png"
          />
          <Marker position={mapConfig.center}>
            <Popup>
              <span>
                A pretty CSS3 popup. <br /> Easily customizable.
              </span>
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}