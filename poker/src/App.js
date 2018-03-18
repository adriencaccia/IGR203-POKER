import React, { Component } from 'react';
import './App.css';
import '../node_modules/leaflet/dist/leaflet.css';
import ReactLeafletMap from './LeafMap'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactLeafletMap/>
      </div>
    );
  }
}

export default App;
