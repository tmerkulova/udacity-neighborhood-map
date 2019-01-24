// let map;
// let markers = [];

// const sightseeings = {
//   "locations": [
//     {
//       "id": 1,
//       "name": "The Moscow Kremlin",
//       "location": {
//         "lat": 55.752023,
//         "lng": 37.6175
//       }
//     },
//     {
//       "id": 2,
//       "name": "Moscow Manege",
//       "location": {
//         "lat": 55.7534117,
//         "lng": 37.6122911
//       }
//     }
//   ]
// }

// document.addEventListener('DOMContentLoaded', (event) => {
// });

window.initMap = () => {
  let loc = {
    lat: 55.752716,
    lng: 37.617489
  }
  let map = new google.maps.Map(document.getElementById('map'), {
    center: loc,
    zoom: 15
  });

  sightseeings.locations.forEach((loc) => {
    let marker = new google.maps.Marker({
      position: loc.location,
      map: map,
      title: loc.name
    });

    let infowindow = new google.maps.InfoWindow({
      content: loc.name
    });

    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });
  });
}

