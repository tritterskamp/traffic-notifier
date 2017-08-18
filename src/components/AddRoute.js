// Dependencies:
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import firebase from '../firebase';

class AddRoute extends Component {
  constructor(props) {
    super(props);
    // Binding methods
    this.loadMap = this.loadMap.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.AutocompleteDirectionsHandler = this.AutocompleteDirectionsHandler.bind(this);
    this.setupClickListener = this.setupClickListener.bind(this);
    this.setupPlaceChangedListener = this.setupPlaceChangedListener.bind(this);
    this.route = this.route.bind(this);
  }

  // Lifecycle methods:
  componentDidMount() {
    // this.loadMap();
    // this.AutocompleteDirectionsHandler();
  }

  componentDidUpdate(prevProps, prevState) {
    // check if google api is available before trying to load map
    if (prevProps.google !== this.props.google) {
      // this.loadMap();
      // this.AutocompleteDirectionsHandler();
    }
  }

  // Form handlers:
  handleSubmit(e) {
    // Prevents page from refreshing on submit
    e.preventDefault();
    // Set up reference for storing this info in Firebase
    const routesRef = firebase.database().ref('routes');
    // Grab the input values that have been entered
    const route = {
      start: this.props.startLocation,
      end: this.props.endLocation,
      departureTime: this.props.departureTime,
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
      const mapConfig = Object.assign({});
      // instantiate this map
      const map = new maps.Map(node, mapConfig);

      this.AutocompleteDirectionsHandler(map);
    }
  }

  AutocompleteDirectionsHandler(map) {
    // check if google api is available before trying to load map
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;

      this.map = map;
      this.originPlaceId = null;
      this.destinationPlaceId = null;
      this.travelMode = 'DRIVING';
      this.departureTime = new Date(Date.now());

      const originInput = this.refs.startLocation;
      const destinationInput = this.refs.endLocation;

      this.directionsService = new maps.DirectionsService();
      this.directionsDisplay = new maps.DirectionsRenderer();
      this.directionsDisplay.setMap(map);

      const originAutocomplete = new maps.places.Autocomplete(originInput);
      const destinationAutocomplete = new maps.places.Autocomplete(destinationInput);

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
    const radioButton = document.getElementById(id);
    const me = this;
    radioButton.addEventListener('click', () => {
      me.travelMode = mode;
      me.route();
    });
  }

  setupPlaceChangedListener(autocomplete, mode) {
    const me = this;
    autocomplete.bindTo('bounds', this.map);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.place_id) {
        window.alert('Please select an option from the dropdown list.');
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
  }

  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }
    const me = this;
    const directionsPanel = me.refs.directionsPanel;

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
        provideRouteAlternatives: true,
        drivingOptions: {
          departureTime: this.departureTime,
          trafficModel: 'bestguess',
        },
      },
      (response, status) => {
        if (status === 'OK') {
          me.directionsDisplay.setDirections(response);
          me.directionsDisplay.setPanel(directionsPanel);
        } else {
          window.alert(`Directions request failed due to ${status}`);
        }
      },
    );
  }

  // handleStartLocationChange(e) {
  //   this.props.onStartLocationInput(e.target.value);
  // }
  // handleEndLocationChange(e) {
  //   this.props.onEndLocationInput(e.target.value);
  // }
  // handleDepartureTimeChange(e) {
  //   this.props.onDepartureTimeInput(e.target.value);
  //   console.log(e);
  // }
  createRoute(event) {
    event.preventDefault();
    const route = {
      startLocation: this.startLocation.value,
      endLocation: this.endLocation.value,
      travelMode: this.travelMode.value,
      departureTime: this.dateTime.state.inputValue, // this may need to be something different
    };
    this.props.addRoute(route);
    console.log(route);
    this.addRouteForm.reset();
  }

  render() {
    // wrapper div styles
    const style = {
      width: '100%',
      height: '500px',
      position: 'relative',
      overflow: 'auto',
    };

    return (
      <div>
        <section className="add-route col-md-12">
          <h2>Add a route</h2>
          <form ref={input => (this.addRouteForm = input)} onSubmit={e => this.createRoute(e)}>
            <div className="form-group">
              <label htmlFor="startLocation">What is your starting location?</label>
              <input
                type="text"
                className="form-control"
                name="startLocation"
                placeholder="Start Address"
                ref={input => (this.startLocation = input)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="endLocation">What is your ending location?</label>
              <input
                type="text"
                className="form-control"
                name="endLocation"
                placeholder="End Address"
                ref={input => (this.endLocation = input)}
              />
            </div>
            <div className="form-group" id="mode-selector" ref={input => (this.travelMode = input)}>
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
              <Datetime
                className="input-group date"
                ref={dateTime => (this.dateTime = dateTime)}
                dateFormat={false}
                onChange={() => console.log(this.dateTime.state.inputValue)}
              />
              {/* <div className="input-group date" id="datetimepicker" ref="datetimepicker">
                <input type="text" className="form-control" />
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-time" />
                </span>
              </div> */}
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
      </div>
    );
  }
}

AddRoute.propTypes = {
  addRoute: PropTypes.func.isRequired,
};

export default AddRoute;
