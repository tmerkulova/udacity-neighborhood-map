import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import CustomMarker from './CustomMarker';

const mapStyles = {
  width: '100%',
  height: '100%',
};

export class MapContainer extends Component {
  CLIENT_ID ='FFHQ5WOV1UXQYMN3MWMHG5DVMSODZVFVDB3EJ3WK30F3203R';
  CLIENT_SECRET ='2LMLOTKCNAHDI1ARI4Y5EWJWEWUXA3JWTPTEIAICWDXZQ212';

  state = {
    activeMarker: {},
    selectedPlace: {},
    description: 'Loading...',
  }

  fetchData() {
    fetch('https://api.foursquare.com/v2/venues/search?ll=51.5115843854343,-0.11755949510958881&client_id=' + this.CLIENT_ID + '&client_secret=' + this.CLIENT_SECRET + '&v=201908125&categoryId=4bf58dd8d48988d181941735&limit=20&query=' + this.state.activeMarker.name)
      .then(result => {
        return result.json();
      })
      .then(searchData => {
        return searchData.response.venues[0].id;
      })
      .then(venueId => {
        fetch('https://api.foursquare.com/v2/venues/' + venueId + '?client_id=' + this.CLIENT_ID + '&client_secret=' + this.CLIENT_SECRET + '&v=201908126')
          .then(result => {
            return result.json();
          })
          .then(venuData => {
            let des = "None";
            if (venuData.response.venue.description) {
              des = venuData.response.venue.description;
            }
            this.setState({ description: des })
          })
      }).catch(err => {
        this.setState({ description: 'Oops... Please check your internet connection!' })
      })
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      description: 'Loading...'
    });
    this.fetchData();
    this.props.updateInfoWindowState();
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={13}
        style={mapStyles}
        initialCenter={{
          "lat": 51.5115843854343,
          "lng": -0.11755949510958881,
        }}>
        {
          this.props.markers.map(marker => (
            <CustomMarker
              key={marker.id}
              id={marker.id}
              name={marker.name}
              position={marker.location}
              onClick={this.onMarkerClick}
              bouncingMarker={this.props.bouncingMarker}
            ></CustomMarker>
          ))
        }
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.props.showInfoWindow}
        >
          <div className="additional-info">
            <h1>{this.state.activeMarker.name}</h1>
            <div>{this.state.description}</div>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAbhBeF81pP5oSGgcYs65I9MWNd8GDBlME'
})(MapContainer);