import { createAction, handleActions } from 'redux-actions'


// ------------------------------------
// Constants
// ------------------------------------
export const GET_LOCATION = 'GET_LOCATION'

// ------------------------------------
// Actions
// ------------------------------------
export const getLocation =  createAction(GET_LOCATION, ()=> {

  var loc
  //get geolocation

if (navigator.geolocation) {
    var geoFind = new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(
      function(position) {
        loc = ({lat: position.coords.latitude.toFixed(6),lon: position.coords.longitude.toFixed(6)})
        resolve(loc);
      },
      function(error) {
        console.log("something went wrong with your stuff")
        reject("something went wrong with your stuff");
      },
      { timeout: 10000 }
    )
  });
    return geoFind.then(function(result) {
      return result;
    });

  } else {
    return "YOUR BROWSER SUCKS"  // device doesn't support geolocation
  }

});


export const actions = {
  getLocation
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [GET_LOCATION]: (state, { payload }) => payload
}, {lat:0,lon:0})
