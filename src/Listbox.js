import React, { Component } from 'react';

class Listbox extends Component {

  render() {
    return (
      <div role="list">
        {this.props.markers.map(marker => (
          <ul role="listitem"
            key={marker.id}
            onClick={ () => {this.props.bouncingMarker(marker.id) }}
            tabIndex="0"
          >
            {marker.name}
          </ul>
        ))}
      </div>
    );
  }
}

export default Listbox;
