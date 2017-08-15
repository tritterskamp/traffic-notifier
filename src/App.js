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
      routes: {},
    };
    // Binding methods
    this.addRoute = this.addRoute.bind(this);
  }

  // This gets passed down to AddRoute component and is called when the form is filled out there
  addRoute(route) {
    // update our state - make a copy first, this is best practice:
    const routes = {...this.state.routes};
    // add in our new fish
    const timestamp = Date.now();
    routes[`route-${timestamp}`] = route;
    // set state
    this.setState({ routes });
  }

  // handleStartLocationInput(inputText) {
  //   this.setState({
  //     startLocation: inputText,
  //   });
  // }
  // handleEndLocationInput(inputText) {
  //   this.setState({
  //     endLocation: inputText,
  //   });
  // }
  // handleDepartureTimeInput(inputText) {
  //   this.setState({
  //     departureTime: inputText,
  //   });
  // }

  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="container">
          <div className="row clearfix">
            <AddRoute
              google={this.props.google}
              routes={this.state.routes}
              addRoute={this.addRoute}
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
