import React, { Component } from 'react'
import './css/styles.css'
import { Route } from 'react-router-dom';
import Map from './Map';
import Listbox from './Listbox';
import markers from './data/data';

class NeighborhoodMapApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: markers,
      shownMarkers: markers,
      bouncingMarker: '',
    }
  }

  componentDidMount() {
  }

  onButtonClick() {
    if (document.querySelector('#filter-options').classList.contains('hidden')) {
      document.querySelector('#filter-options').className = document.querySelector('#filter-options').className.replace('hidden', '');;
    } else {
      document.querySelector('#filter-options').className += ' hidden';
    }
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
    document.querySelector('#filter-options').className += ' hidden';
    this.setState(state => state.bouncingMarker = markerId);
    let timeout = setTimeout(() => {
      this.setState(state => state.bouncingMarker = '');
      clearTimeout(timeout);
    }, 3000);
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="page-wrapper">
            <header id="header">
              <button
                id="menu"
                onClick={this.onButtonClick}
              >
                M
              </button>
              <h1>Museums of London</h1>
            </header>
            <main id="maincontent">
              <div id="filter-options" className='hidden'>
                <input onChange={this.handleChange} type="text" placeholder="Search for places"></input>
                <Listbox
                  markers={this.state.shownMarkers}
                  bouncingMarker = {this.updateBouncingMarker.bind(this)}
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
              Copyright (c) 2019 <a href="/" style={{color: 'red'}}>Neighborhood Map</a> All Rights Reserved.
            </footer>
          </div>
        )}>
        </Route>
      </div>
    )

  }
}

export default NeighborhoodMapApp;