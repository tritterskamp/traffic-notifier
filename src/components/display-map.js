import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { GoogleApiWrapper } from 'google-maps-react';

class DisplayMap extends Component {
  constructor(props) {
    super(props);
    // Set initial states for this component
    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }
    // Binding methods
    this.loadMap = this.loadMap.bind(this);
    this.recenterMap = this.recenterMap.bind(this);
  }

  componentDidMount() {
    // if browser supports navigator.geolocation property let's use those coordinates for our currentLocation state
    if (this.props.centerAroundCurrentLocation) {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })
            })
        }
    }
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    // check if google api is available before trying to load map
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    // check if the currentLocation state has changed and recenter the map
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  loadMap() {
    // check if google api is available before trying to load map
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;

      // grab reference to the dom
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      // setting some initial map configs:
      let {initialCenter, zoom} = this.props;
      const {lat, lng} = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig= Object.assign({}, {
        center: center,
        zoom: zoom
      })
      // instantiate this map
      this.map = new maps.Map(node, mapConfig);
    }
  }

  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(curr.lat, curr.lng)
      // use google maps api .panTo() method to recenter
      map.panTo(center);
    }
  }

  render () {

    // wrapper div styles
    const style = {
      width:'100%',
      height: '500px',
      position: 'relative'
    }

    return (
      <section className="display-map col-md-12">
        <h2>Directions</h2>
        <div style={style} ref='map'>
          Loading map...
        </div>
      </section>
    )
  }
}

// define prop types
DisplayMap.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool
}

// set default props
DisplayMap.defaultProps = {
  zoom: 10,
  // St. Louis, by default
  initialCenter: {
    lat: 38.6071456,
    lng: -90.2265348
  },
  centerAroundCurrentLocation: false
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBHlx9FRhnZ9m0onZlBGDAuPnLQumPPZJc"
})(DisplayMap)
