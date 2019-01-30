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
      showInfoWindow: false,
    }
  }

  componentDidMount() {
  }

  onButtonClick() {
    if (document.querySelector('#filter-options').classList.contains('hidden')) {
      document.querySelector('#filter-options').className = document.querySelector('#filter-options').className.replace('hidden', '');
      document.querySelector('button#menu').setAttribute('aria-expanded', true);
    } else {
      document.querySelector('#filter-options').className += ' hidden';
      document.querySelector('button#menu').setAttribute('aria-expanded', false);
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
    this.setState({ bouncingMarker: markerId, showInfoWindow: false });
    let timeout = setTimeout(() => {
      this.setState(state => state.bouncingMarker = '');
      clearTimeout(timeout);
    }, 3000);
  }

  updateInfoWindowState() {
    this.setState({ showInfoWindow: true });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="page-wrapper">
            <header id="header">
              <button
                aria-label="museums menu"
                id="menu"
                onClick={this.onButtonClick}
                tabIndex="0"
                aria-expanded="false"
              >
                
              </button>
              <h1>Museums of London</h1>
            </header>
            <main id="maincontent">
              <div id="filter-options" className='hidden'>
                <input onChange={this.handleChange} type="text" placeholder="Search for museums"></input>
                <Listbox
                  markers={this.state.shownMarkers}
                  bouncingMarker = {this.updateBouncingMarker.bind(this)}
                >
                </Listbox>
              </div>
              <div id="map" role="application">
                <Map
                  markers={this.state.shownMarkers}
                  bouncingMarker={this.state.bouncingMarker}
                  showInfoWindow={this.state.showInfoWindow}
                  updateInfoWindowState={this.updateInfoWindowState.bind(this)}
                >
                </Map>
              </div>
            </main>
            <footer id="footer">
              <span>Copyright (c) 2019</span>
              <span style={{ color: 'red' }}> Neighborhood Map </span>
              <span>All Rights Reserved.</span>
            </footer>
          </div>
        )}>
        </Route>
      </div>
    )

  }
}

export default NeighborhoodMapApp;