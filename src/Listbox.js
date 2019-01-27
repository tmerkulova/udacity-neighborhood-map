import React, { Component } from 'react';

class Listbox extends Component {

  render() {
    return (
      <div>
        {this.props.markers.map(marker => (
          <ul
            key={marker.id}
            onClick={ () => {this.props.bouncingMarker(marker.id) }}
          >
            {marker.name}
          </ul>
        ))}

      </div>
    );
  }
}

export default Listbox;
