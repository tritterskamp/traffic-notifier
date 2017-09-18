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
    this.getRouteDirections = this.getRouteDirections.bind(this);
  }

  // This gets passed down to AddRoute component and is called when the form is filled out there
  addRoute(route) {
    // update our state - make a copy first, this is best practice:
    const routes = {...this.state.routes};
    // add in our new route
    const timestamp = Date.now();
    routes[`route-${timestamp}`] = route;
    // set state
    this.setState({ routes });
    this.getRouteDirections(route);
  }

  // When form is submitted, we want to return and display route directions
  /*
  1. Pass the form values to a function that will process and display route directions

  */
  getRouteDirections(route) {
      if (!route.startLocation || !route.endLocation) {
        return;
      }
      console.log(route);

      // This probably belongs in the DisplayDirections component?
      // if (this.props && this.props.google) {
      //   const { google } = this.props;
      //   const maps = google.maps;
      //   const me = this;
      //   const directionsPanel = me.refs.directionsPanel;

      //   this.map = map;
      //   this.directionsService = new maps.DirectionsService();
      //   this.directionsDisplay = new maps.DirectionsRenderer();
      //   this.directionsDisplay.setMap(map);

      //   this.directionsService.route(
      //     {
      //       origin: { placeId: route.startLocation },
      //       destination: { placeId: route.endLocation },
      //       travelMode: route.travelMode,
      //       provideRouteAlternatives: true,
      //       drivingOptions: {
      //         departureTime: route.departureTime,
      //         trafficModel: 'bestguess',
      //       },
      //     },
      //     (response, status) => {
      //       if (status === 'OK') {
      //         me.directionsDisplay.setDirections(response);
      //         me.directionsDisplay.setPanel(directionsPanel);
      //       } else {
      //         window.alert(`Directions request failed due to ${status}`);
      //       }
      //     },
      //   );
      // }
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
            <DisplayDirections 
              google={this.props.google}
              routes={this.state.routes}
             />
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
