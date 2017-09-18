import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class DisplayMap extends Component {
  constructor(props) {
    super(props);
    // Set initial states for this component
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat,
        lng,
      },
    };
    // Binding methods
    this.loadMap = this.loadMap.bind(this);
    this.recenterMap = this.recenterMap.bind(this);
    this.displayDirections = this.displayDirections.bind(this);
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
              lng: coords.longitude,
            },
          });
        });
      }
    }
    this.loadMap();
    this.displayDirections();
  }

  componentDidUpdate(prevProps, prevState) {
    // check if google api is available before trying to load map
    if (prevProps.google !== this.props.google) {
      this.loadMap();
      this.displayDirections();
    }
    // check if the currentLocation state has changed and recenter the map
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  loadMap() {
    // check if google api is available before trying to load map
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;

      // grab reference to the dom
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      // setting some initial map configs:
      const { initialCenter, zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center,
          zoom,
        },
      );
      // instantiate this map
      this.map = new maps.Map(node, mapConfig);
      this.displayDirections(map);
    }
  }

  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      const center = new maps.LatLng(curr.lat, curr.lng);
      // use google maps api .panTo() method to recenter
      map.panTo(center);
    }
  }

  displayDirections(map) {
      if (this.props && this.props.google) {
        const { google } = this.props;
        const maps = google.maps;
        const me = this;
        const directionsPanel = me.refs.directionsPanel;

        this.map = map;
        this.directionsService = new maps.DirectionsService();
        this.directionsDisplay = new maps.DirectionsRenderer();
        this.directionsDisplay.setMap(map);

        this.directionsService.route(
          {
            origin: { placeId: route.startLocation },
            destination: { placeId: route.endLocation },
            travelMode: route.travelMode,
            provideRouteAlternatives: true,
            drivingOptions: {
              departureTime: route.departureTime,
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
  }


  // AutocompleteDirectionsHandler(map) {
  //   // check if google api is available before trying to load map
  //   if (this.props && this.props.google) {
  //     const { google } = this.props;
  //     const maps = google.maps;

  //     this.map = map;
  //     this.originPlaceId = null;
  //     this.destinationPlaceId = null;
  //     this.travelMode = 'DRIVING';
  //     this.departureTime = new Date(Date.now());

  //     const originInput = this.refs.startLocation;
  //     const destinationInput = this.refs.endLocation;

  //     this.directionsService = new maps.DirectionsService();
  //     this.directionsDisplay = new maps.DirectionsRenderer();
  //     this.directionsDisplay.setMap(map);

  //     const originAutocomplete = new maps.places.Autocomplete(originInput);
  //     const destinationAutocomplete = new maps.places.Autocomplete(destinationInput);

  //     this.setupClickListener('changemode-walking', 'WALKING');
  //     this.setupClickListener('changemode-transit', 'TRANSIT');
  //     this.setupClickListener('changemode-driving', 'DRIVING');
  //     this.setupClickListener('changemode-bicycling', 'BICYCLING');

  //     this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
  //     this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
  //   }
  // }
    

  

  render() {
    // wrapper div styles
    const style = {
      width: '100%',
      height: '500px',
      position: 'relative',
      overflow: 'auto',
    };

    return (
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
    );
  }
}

// define prop types
DisplayMap.propTypes = {
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool,
};

// set default props
DisplayMap.defaultProps = {
  zoom: 10,
  // St. Louis, by default
  initialCenter: {
    lat: 38.6071456,
    lng: -90.2265348,
  },
  centerAroundCurrentLocation: false,
};

export default DisplayMap;
