import React from 'react';
import './App.css';
import Main from './components/Main'
import Sidenav from './components/Sidenav'

const App = () => (
  <div>
  	<Sidenav />
  	<div className="container">
    	<Main />
    </div>
  </div>
)

export default App;
