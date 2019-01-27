import React, { Component } from 'react'
import './css/styles.css'
import { Link, Route } from 'react-router-dom';
import Map from './Map';
import Listbox from './Listbox';
import markers from './data/data';

class NeighborhoodMapApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: markers,
      shownMarkers: markers,
      bouncingMarker: {},
    }
  }

  componentDidMount() {
  }

  handleChange = (event) => {
    const query = event.target.value;
    if (query !== '') {
      this.setState(state => ({
          shownMarkers: state.markers.filter((marker) => {
            return marker.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
          })
        }
      ))
    } else {
      this.setState(state => ({
        shownMarkers: state.markers
      }))
    }
  }

  updateBouncingMarker(markerId) {
    this.setState(state => state.bouncingMarker = markerId);
    console.log('>>>>', this.state);
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="page-wrapper">
            <header id="header">
              <h1>Neighborhood Map</h1>
            </header>
            <main id="maincontent">
              <div id="filter-options">
                <input onChange={this.handleChange} type="text" placeholder="Search for places"></input>
                <Listbox
                  markers={this.state.shownMarkers}
                  bouncingMarker = { this.updateBouncingMarker.bind(this) }
                >
                </Listbox>
              </div>
              <div id="map">
                <Map
                  markers={this.state.shownMarkers}
                  bouncingMarker={this.state.bouncingMarker}
                >
                </Map>
              </div>
            </main>
            <footer id="footer">
              Copyright (c) 2019 <a href="/"><strong>Neighborhood Map</strong></a> All Rights Reserved.
            </footer>
          </div>
        )}>
        </Route>
      </div>
    )

  }
}

export default NeighborhoodMapApp;