import React, { Component } from 'react';
import firebase from '../firebase.js';

class DisplayRoutes extends Component {
  constructor() {
    super();
    // Set initial states for this component
    this.state = {
      routes: []
    }
  }

  componentDidMount() {
    // Create a reference to path routes are stored in Firebase
    const routesRef = firebase.database().ref(`routes`);
    // Call Firebase's value custom event listener
    routesRef.on('value', (snapshot) => {
      // Create a snapshot of current routes stored in Firebase
      let routes = snapshot.val();
      let newState = [];

      // Iterate over those entries and push them into newState array
      for (let route in routes) {
        newState.push({
          id: route,
          start: routes[route].start,
          end: routes[route].end
        });
      }
      // Update routes state to match snapshot
      this.setState({
        routes: newState
      });
    });
  }

  removeRoute(routeId) {
    // This time create a reference to the specific route id we want to remove
    const routeRef = firebase.database().ref(`routes/${routeId}`);
    // Then remove it from Firebase
    routeRef.remove();
  }

  render () {
    return (
      <section className="display-routes col-md-12">
        <div className="wrapper">
          <h2>Saved Routes</h2>
          <ul className="list-unstyled">
            {this.state.routes.map((route) => {
              return (
                <li key={route.id}>
                  <button type="button" className="close" aria-label="Remove" onClick={() => this.removeRoute(route.id)}><span aria-hidden="true">&times;</span></button>
                  <p><strong>Start location:</strong><br />
                    {route.start}
                  </p>
                  <p><strong>End location:</strong><br />
                    {route.end}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    )
  }
}

export default DisplayRoutes;
