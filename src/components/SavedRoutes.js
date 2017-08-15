import React, { Component } from 'react';
import firebase from '../firebase';
import Route from '../components/Route';

class SavedRoutes extends Component {
  constructor() {
    super();
    // Set initial states for this component
    this.state = {
      routes: [],
    };
  }

  componentDidMount() {
    // Create a reference to path routes are stored in Firebase
    const routesRef = firebase.database().ref('routes');
    // Call Firebase's value custom event listener
    routesRef.on('value', (snapshot) => {
      // Create a snapshot of current routes stored in Firebase
      const routes = snapshot.val();
      const newState = [];

      // Iterate over those entries and push them into newState array
      for (const route in routes) {
        newState.push({
          id: route,
          start: routes[route].start,
          end: routes[route].end,
        });
      }
      // Update routes state to match snapshot
      this.setState({
        routes: newState,
      });
    });
  }

  removeRoute(routeId) {
    // This time create a reference to the specific route id we want to remove
    const routeRef = firebase.database().ref(`routes/${routeId}`);
    // Then remove it from Firebase
    routeRef.remove();
  }

  render() {
    return (
      <section className="saved-routes col-md-12">
        <div className="wrapper">
          <h2>Saved Routes</h2>
          <ul className="list-unstyled">
            {this.props.routes.map(route =>
              (<Route
                key={route.id}
                startLocation={route.startLocation}
                endLocation={route.endLocation}
                departureTime={route.departureTime}
                travelMode={route.travelMode}
              />),
            )}
          </ul>
        </div>
      </section>
    );
  }
}

export default SavedRoutes;
