import React, { Component } from 'react';
import firebase from '../firebase.js';

class AddRoute extends Component {
  constructor() {
    super();
    // Set initial states for this component
    this.state = {
      startLocation: '',
      endLocation: ''
    }
    // Binding methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
    })
  }

  render () {
    return (
      <section className="add-route col-md-12">
        <h2>Add a route</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="startLocation">What is your starting location?</label>
            <input type="text" className="form-control" name="startLocation" placeholder="Start Address" onChange={this.handleChange} value={this.state.startLocation}/>
          </div>
          <div className="form-group">
            <label htmlFor="endLocation">What is your ending location?</label>
            <input type="text" className="form-control" name="endLocation" placeholder="End Address" onChange={this.handleChange} value={this.state.endLocation}/>
          </div>
          <button className="btn btn-default">Save Route</button>
        </form>
      </section>
    )
  }
}

export default AddRoute;
