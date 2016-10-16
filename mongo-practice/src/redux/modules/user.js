import { handleActions, createAction } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_USER = 'GET_USER'

// ------------------------------------
// Actions
// ------------------------------------
export const getUser = createAction(GET_USER, (user = 1) => user)

export const actions = {
  getUser
}
// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [GET_USER]: (state, { payload }) => payload
}, {points: 0, id: 0, username: 0, loggedin: false})
