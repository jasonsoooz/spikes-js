"use strict";

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

let placeSearch, autocomplete;
const componentForm = {
  property_name: 'long_name',
  unit_number: 'short_name',
  street_number: 'short_name',
  route: 'long_name', // street name
  street_type: 'short_name',
  locality: 'long_name', // suburb
  administrative_area_level_1: 'short_name', // state
  postal_code: 'short_name',
  country: 'long_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
    {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function setStreetNameAndStreetType(streetFullName) {
  const pattern = /\b(\w+)$/;
  const matches = pattern.exec(streetFullName);
  const streetType = matches[0].toUpperCase();
  document.getElementById("street_type").value = streetType;

  const matchIndex = matches["index"];
  const streetName = streetFullName.substring(0, matchIndex-1);
  document.getElementById("route").value = streetName;
  console.log("streetFullName: %s, streetName: %s, streetType: %s", streetFullName, streetName, streetType);
}

function setUnitNumber() {
  const address = document.getElementById("autocomplete").value;
  const unitIndex = address.indexOf("/");
  const unitNumber = address.substring(0, unitIndex);
  document.getElementById("unit_number").value = unitNumber;
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();
  // console.log("place: ");
  // console.log(place);

  for (const component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  let routeIndex;
  for (let i = 0; i < place.address_components.length; i++) {
    const addressType = place.address_components[i].types[0];

    if (addressType == 'route') {
      routeIndex = i;
    }

    if (componentForm[addressType]) {
      const val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }

  const streetFullName = place.address_components[routeIndex].short_name;
  setStreetNameAndStreetType(streetFullName);
  setUnitNumber();
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      const circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}