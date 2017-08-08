// Dependencies:
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import firebase from '../firebase.js';
import ReactDatetime from 'react-datetime';
import { GoogleApiWrapper } from 'google-maps-react'

class AddRoute extends Component {
  constructor(props) {
    super(props);
    // Set initial states for this component
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      startLocation: "",
      endLocation: ""
    };
    // Binding methods
    this.loadMap = this.loadMap.bind(this);
    this.recenterMap = this.recenterMap.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);        
    //this.renderAutoComplete = this.renderAutoComplete.bind(this);
    this.AutocompleteDirectionsHandler = this.AutocompleteDirectionsHandler.bind(this);
    this.setupClickListener = this.setupClickListener.bind(this);
    this.setupPlaceChangedListener = this.setupPlaceChangedListener.bind(this);
    this.route = this.route.bind(this);
  }

  // Lifecycle methods:
  componentDidMount() {
    // if browser supports navigator.geolocation property let's use those coordinates for our currentLocation state
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    this.loadMap();
    //this.AutocompleteDirectionsHandler();
  }

  componentDidUpdate(prevProps, prevState) {
    // check if google api is available before trying to load map
    if (prevProps.google !== this.props.google) {
      this.loadMap();
      //this.AutocompleteDirectionsHandler();
    }

    // check if the currentLocation state has changed and recenter the map
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  // Form handlers:
  handleChange(e) {
    // Updates the state key:value pair based on input value
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    // Prevents page from refreshing on submit
    e.preventDefault();
    // Set up reference for storing this info in Firebase
    const routesRef = firebase.database().ref(`routes`);
    // Grab the input values that have been entered
    const route = {
      start: this.state.startLocation,
      end: this.state.endLocation
    };
    // Push those values to Firebase
    routesRef.push(route);
    // Clear out the input states
    // this.setState({
    //   startLocation: "",
    //   endLocation: ""
    // });
  }

  // Interacting with Google Maps API:
  loadMap() {
    // check if google api is available before trying to load map
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;

      // grab reference to the dom
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      // setting some initial map configs:
      let { initialCenter, zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );
      // instantiate this map
      const map = new maps.Map(node, mapConfig);

      this.AutocompleteDirectionsHandler(map);
    }
  }

  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(curr.lat, curr.lng);
      // use google maps api .panTo() method to recenter
      map.panTo(center);
    }
  }

  // renderAutoComplete() {
  //   // check if google api is available before trying to load map
  //   if (this.props && this.props.google) {
  //     const { google } = this.props;
  //     const maps = google.maps;

  //     // grab reference to the dom
  //     const startLocation = this.refs.startLocation;
  //     const endLocation = this.refs.endLocation;

  //     // instantiate startLocation autocomplete
  //     var startAutoComplete = new maps.places.Autocomplete(startLocation);

  //     // listen for startLocation place_changed event listener
  //     startAutoComplete.addListener("place_changed", () => {
  //       const startLocationPlace = startAutoComplete.getPlace();
  //       this.setState({ startLocation: startLocationPlace.formatted_address });
  //     });

  //     // instantiate endLocation autocomplete
  //     var endAutoComplete = new maps.places.Autocomplete(endLocation);

  //     // listen for startLocation place_changed event listener
  //     endAutoComplete.addListener("place_changed", () => {
  //       const endLocationPlace = endAutoComplete.getPlace();
  //       this.setState({
  //         endLocation: endLocationPlace.formatted_address
  //       });
  //     });
  //   }
  // }

  AutocompleteDirectionsHandler(map) {
   // check if google api is available before trying to load map
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;
    
      this.map = map;
      this.originPlaceId = null;
      this.destinationPlaceId = null;
      this.travelMode = 'DRIVING';

      const originInput = this.refs.startLocation;
      const destinationInput = this.refs.endLocation;
      const modeSelector = this.refs.modeSelector;
      
      this.directionsService = new maps.DirectionsService();
      this.directionsDisplay = new maps.DirectionsRenderer();
      this.directionsDisplay.setMap(map);

      const originAutocomplete = new maps.places.Autocomplete(
        originInput
      );
      const destinationAutocomplete = new maps.places.Autocomplete(
        destinationInput
      );

      this.setupClickListener('changemode-walking', 'WALKING');
      this.setupClickListener('changemode-transit', 'TRANSIT');
      this.setupClickListener('changemode-driving', 'DRIVING');
      this.setupClickListener('changemode-bicycling', 'BICYCLING');

      this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
      this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');      
    }
  }

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  setupClickListener(id, mode) {
    var radioButton = document.getElementById(id);
    var me = this;
    radioButton.addEventListener('click', function() {
      me.travelMode = mode;
      me.route();
    });
  };

  setupPlaceChangedListener(autocomplete, mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }
      if (mode === 'ORIG') {
        me.originPlaceId = place.place_id;
        me.setState({ startLocation: place.formatted_address });
      } else {
        me.destinationPlaceId = place.place_id;
        me.setState({ endLocation: place.formatted_address });
      }
      me.route();
    });

  };

  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }
    const me = this;
    const directionsPanel = me.refs.directionsPanel;


    this.directionsService.route({
      origin: {'placeId': this.originPlaceId},
      destination: {'placeId': this.destinationPlaceId},
      travelMode: this.travelMode,
      provideRouteAlternatives: true,
      drivingOptions: {
        departureTime: new Date(Date.now()),
        trafficModel: 'bestguess'
      }
    }, function(response, status) {
      if (status === 'OK') {
        me.directionsDisplay.setDirections(response);
        me.directionsDisplay.setPanel(directionsPanel);        
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  };

  render() {
    // wrapper div styles
    const style = {
      width:'100%',
      height: '500px',
      position: 'relative',
      overflow: 'auto'
    }

    return <div>
        <section className="add-route col-md-12">
          <h2>Add a route</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="startLocation">
                What is your starting location?
              </label>
              <input type="text" className="form-control" name="startLocation" placeholder="Start Address" ref="startLocation" onChange={this.handleChange} value={this.state.startLocation} />
            </div>
            <div className="form-group">
              <label htmlFor="endLocation">
                What is your ending location?
              </label>
              <input type="text" className="form-control" name="endLocation" placeholder="End Address" ref="endLocation" onChange={this.handleChange} value={this.state.endLocation} />
            </div>
            <div className="form-group" id="mode-selector" ref="modeSelector">
              <p className="help-block">Choose a mode of transportation:</p>
              <label className="radio-inline" htmlFor="changemode-driving">
                <input type="radio" name="type" id="changemode-driving" defaultChecked="checked" />
                Driving
              </label>
              <label className="radio-inline" htmlFor="changemode-transit">
                <input type="radio" name="type" id="changemode-transit" />
                Transit
              </label>
              <label className="radio-inline" htmlFor="changemode-walking">
                <input type="radio" name="type" id="changemode-walking" />
                Walking
              </label>
              <label className="radio-inline" htmlFor="changemode-bicycling">
                <input type="radio" name="type" id="changemode-bicycling" />
                Bicycling
              </label>
            </div>
            <div className="form-group">
            <p className="help-block">What time do you want to leave?</p>
            {/* <Datetime dateFormat={false} /> */}
            <div className="input-group date" id="datetimepicker" ref="datetimepicker">
                <input type="text" className="form-control" />
                <span className="input-group-addon">
                <span className="glyphicon glyphicon-time"></span>
                </span>
              </div>
            </div>
            <button className="btn btn-default">Save Route</button>
          </form>
        </section>
        <section className="display-map col-md-12">
          <h2>Directions</h2>
          <div className="col-md-6">
            <div style={style} ref="map">
              Loading map...
            </div>
          </div>
          <div className="col-md-6">
            <div style={style} ref="directionsPanel" />
          </div>
        </section>
      </div>;
  }
}

// define prop types
AddRoute.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool
}

// set default props
AddRoute.defaultProps = {
  zoom: 10,
  // St. Louis, by default
  initialCenter: {
    lat: 38.6071456,
    lng: -90.2265348
  },
  centerAroundCurrentLocation: false
}

//export default AddRoute;
export default GoogleApiWrapper({
  apiKey: "AIzaSyBHlx9FRhnZ9m0onZlBGDAuPnLQumPPZJc"
})(AddRoute);