import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
// import markers from './data/data';

const mapStyles = {
  width: '100%',
  height: '50%'
};

export class MapContainer extends Component {
  state = {
    // markers: markers,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}    
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

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
          lat: 55.752716,
          lng: 37.617489
        }}>
        {
          this.props.markers.map(marker => (
              <Marker
                key={marker.id}
                id={marker.id}
                name={marker.name}
                position={marker.geometry.location}
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