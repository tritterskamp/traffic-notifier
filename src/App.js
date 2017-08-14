import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import './App.css';
import Navigation from './components/Navigation';
import AddRoute from './components/AddRoute';
import DisplayDirections from './components/DisplayDirections';
import SavedRoutes from './components/SavedRoutes';

class App extends Component {
  constructor(props) {
    super(props);
    // Set initial states for top-down data flow
    this.state = {
      startLocation: '',
      endLocation: '',
      departureTime: '',
      travelMode: '',
    };
    // Binding methods
    this.handleStartLocationInput = this.handleStartLocationInput.bind(this);
    this.handleEndLocationInput = this.handleEndLocationInput.bind(this);
    this.handleDepartureTimeInput = this.handleDepartureTimeInput.bind(this);
  }

  handleStartLocationInput(inputText) {
    this.setState({
      startLocation: inputText,
    });
  }
  handleEndLocationInput(inputText) {
    this.setState({
      endLocation: inputText,
    });
  }
  handleDepartureTimeInput(inputText) {
    this.setState({
      departureTime: inputText,
    });
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="container">
          <div className="row clearfix">
            <AddRoute
              google={this.props.google}
              startLocation={this.state.startLocation}
              endLocation={this.state.endLocation}
              departureTime={this.state.departureTime}
              travelMode={this.state.travelMode}
              onStartLocationInput={this.handleStartLocationInput}
              onEndLocationInput={this.handleEndLocationInput}
              onDepartureTimeInput={this.handleDepartureTimeInput}
            />
          </div>
          <div className="row clearfix">
            <DisplayDirections google={this.props.google} />
          </div>
          <div className="row clearfix">
            <SavedRoutes routes={this.props.routes} />
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBHlx9FRhnZ9m0onZlBGDAuPnLQumPPZJc',
})(App);
