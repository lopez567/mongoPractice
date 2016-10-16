import { handleActions, createAction } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_LEADERS = 'GET_LEADERS'

// ------------------------------------
// Actions
// ------------------------------------
export const getLeaders = createAction(GET_LEADERS, () =>
  fetch('http://localhost:8000/api/leaders')
  .then(function(response) {
     if (response.status >= 400) {
         throw new Error("Bad response from server");
     }
     return response.json();
 })
 .then(function(leaders) {
     return leaders;
 }) )

export const actions = {
  getLeaders
}
// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [GET_LEADERS]: (state, { payload }) => payload
}, [{points: 0, id: 0, username: 0}])
