# spikes-js (javascript)

Collection of javascript spikes.
1. Address auto complete using Google Places API

## Prerequisites
* Modern browser supporting javascript (eg Google Chrome, Firefox, etc)
* Working API key in index.html replacing 'YOUR_API_KEY'
* Tests written in Mocha with Chai assertion framework

Run / test the app:
```
# start the app
Web browser open file: public/index.html
# run tests
npm test
```

### Address auto complete

Example Google Places API code:
https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform

Google now charges ~ $200/month.  No more free API calls.
https://manifesto.co.uk/google-maps-api-pricing-changes/

Free alternatives:
* OpenStreetMap: www.openstreetmap.org
* Australia Post (or Aus Govt data)?

### To do
* Add tests for custom functions (eg setStreetName... & setUnitNumber)
* spike free address auto complete