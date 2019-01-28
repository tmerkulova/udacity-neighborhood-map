import React from 'react';
import { Marker } from 'google-maps-react';

class CustomMarker extends Marker {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState);
    if (this.props.id === this.props.bouncingMarker) {
      this.marker.setAnimation(this.props.google.maps.Animation.BOUNCE)
      let timeout = setTimeout(
        () => {
          this.marker.setAnimation(null);
          clearTimeout(timeout);
        }
      , 2000);
    }
  }
}

export default CustomMarker;