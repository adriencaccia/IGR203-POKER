import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{ text }</div>;

export default class Map extends Component {
  static defaultProps = {
    center: { lat: 48.8260373, lng: 2.34595850 },
    zoom: 11
  }

render() {
    return (
      <div className='google-map'>
        <GoogleMapReact
          defaultCenter={ this.props.center }
          defaultZoom={ this.props.zoom }>
          <AnyReactComponent
            lat={ 48.8260373 }
            lng={ 2.34595850 }
            text={ "COUCOU LES GARS" }
          />
        </GoogleMapReact>
      </div>
    )
  }
}