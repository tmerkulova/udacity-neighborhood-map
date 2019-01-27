import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
// import markers from './data/data';

const mapStyles = {
  width: '100%',
  height: '100%',
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}    
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    //  marker.setAnimation(this.props.google.maps.Animation.BOUNCE)
    // setTimeout(() => {marker.setAnimation(null)}, 3000);
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          "lat": 41.902916,
          "lng": 12.454301
        }}>
        {
          this.props.markers.map(marker => (
            <Marker
              key={marker.id}
              id={marker.id}
              name={marker.name}
              position={marker.location}
              onClick={this.onMarkerClick}
            ></Marker>
          ))
        }
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.activeMarker.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAbhBeF81pP5oSGgcYs65I9MWNd8GDBlME'
})(MapContainer);