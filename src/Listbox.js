import React, { Component } from 'react';

class Listbox extends Component {
  render() {
    return (
      <div>
        {this.props.markers.map(marker => (
          <option
            key={marker.id}
          >
            {marker.name}
          </option>
        ))}

      </div>
    );
  }
}

export default Listbox;
