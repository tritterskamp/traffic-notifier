// Dependencies:
import React, { Component } from 'react';
import './App.css';

// Components:
import Navigation from './components/navigation';
import AddRoute from './components/add-route';
import DisplayRoutes from './components/display-routes';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="container">
          <div className="row">
            <AddRoute />
          </div>
          <div className="row">
            <DisplayRoutes />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
