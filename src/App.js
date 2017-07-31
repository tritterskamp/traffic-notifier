// Dependencies:
import React, { Component } from 'react';
import './App.css';

// Components:
import Navigation from './components/navigation';
import AddRoute from './components/add-route';
import SavedRoutes from './components/saved-routes';
import DisplayMap from './components/display-map';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="container">
          <div className="row clearfix">
            <AddRoute />
          </div>
          <div className="row clearfix">
            <SavedRoutes />
          </div>
          <div className="row clearfix">
            <DisplayMap />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
