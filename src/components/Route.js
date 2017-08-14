import React, { Component } from 'react';

class Route extends Component {
  render() {
    return (
      <li className="route">
        <button
          type="button"
          className="close"
          aria-label="Remove"
          onClick={() => this.removeRoute(this.props.id)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <p>
          <strong>Start location:</strong>
          <br />
          {this.props.startLocation}
        </p>
        <p>
          <strong>End location:</strong>
          <br />
          {this.props.endLocation}
        </p>
        <p>
          <strong>Departure time:</strong>
          <br />
          {this.props.departureTime}
        </p>
        <p>
          <strong>Travel mode:</strong>
          <br />
          {this.props.travelMode}
        </p>
      </li>
    );
  }
}

export default Route;
