import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div id="text">{ text }</div>;

export default class Map extends Component {
  static defaultProps = {
    center: { lat: 48.8260373, lng: 2.34595850 },
    zoom: 17
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
            text={ "TOURNOI#1" }
          />
          <AnyReactComponent
            lat={ 48.8270373 }
            lng={ 2.34695850 }
            text={ "TOURNOI#2" }
          />
          <AnyReactComponent
            lat={ 48.8250373 }
            lng={ 2.34495850 }
            text={ "TOURNOI#3" }
          />
        </GoogleMapReact>
      </div>
    )
  }
}