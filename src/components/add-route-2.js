// Dependencies:
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../firebase.js';
import PropTypes from "prop-types";
import { GoogleApiWrapper } from 'google-maps-react'

// Components [this may change, but importing it here for now]: 
import DisplayMap from "../components/display-map.js";

class AddRoute extends Component {
  constructor(props) {
    super(props);
    // Set initial states for this component
    this.state = {
      startLocation: '',
      endLocation: ''
    }
    // Binding methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderAutoComplete = this.renderAutoComplete.bind(this);
  }

  // Lifecycle methods:
  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    // check if google api is available before trying to load map
    if (prevProps.google !== this.props.google) {
      this.renderAutoComplete();
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
    }
    // Push those values to Firebase
    routesRef.push(route);
    // Clear out the input states
    this.setState({
      startLocation: '',
      endLocation: ''
    });
  }

  // Interacting with Google Maps API:
  renderAutoComplete() {
    // check if google api is available before trying to load map
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;

      // grab reference to the dom
      const startLocation = this.refs.startLocation;
      const endLocation = this.refs.endLocation;
      
      // instantiate startLocation autocomplete 
      var startAutoComplete = new maps.places.Autocomplete(startLocation);

      // listen for startLocation place_changed event listener
      startAutoComplete.addListener("place_changed", () => {
        const startLocationPlace = startAutoComplete.getPlace();
        this.setState({ startLocation: startLocationPlace.formatted_address });
      });

      // instantiate endLocation autocomplete 
      var endAutoComplete = new maps.places.Autocomplete(endLocation);

      // listen for startLocation place_changed event listener
      endAutoComplete.addListener("place_changed", () => {
        const endLocationPlace = endAutoComplete.getPlace();
        this.setState({
          endLocation: endLocationPlace.formatted_address
        });
      });
    }
  }

  render () {
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
            <div className="form-group" id="mode-selector">
              <p className="help-block">Choose a mode of transportation:</p>
              <label className="radio-inline" htmlFor="changemode-walking">
                <input type="radio" name="type" id="changemode-walking" />
                Walking
              </label>
              <label className="radio-inline" htmlFor="changemode-transit">
                <input type="radio" name="type" id="changemode-transit" />
                Transit
              </label>
              <label className="radio-inline" htmlFor="changemode-driving">
                <input type="radio" name="type" id="changemode-driving" />
                Driving
              </label>
            </div>
            <button className="btn btn-default">Get Directions</button>
          </form>
        </section>
        <DisplayMap />
      </div>    
  }
}

//export default AddRoute;
export default GoogleApiWrapper({
  apiKey: "AIzaSyBHlx9FRhnZ9m0onZlBGDAuPnLQumPPZJc"
})(AddRoute);