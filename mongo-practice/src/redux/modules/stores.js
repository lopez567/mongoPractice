import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_STORES = 'GET_STORES'

// ------------------------------------
// Actions
// ------------------------------------
export const getLocalStores = createAction(GET_STORES, (coord) => {
  var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+coord.lat+','+ coord.lon +' &radius=2000&type=liquor_store&key=AIzaSyDra-9gpjCESYPaGJtu-d44z7YyeQgU0gg'
  return fetch(url)
  .then(function(response) {
     if (response.status >= 400) {
         throw new Error("Bad response from server");
     }
     return response.json();
 })
 .then(function(stores) {
     return stores.results;
 })

})



export const actions = {
  getLocalStores
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [GET_STORES]: (state, { payload }) => payload
}, [])
