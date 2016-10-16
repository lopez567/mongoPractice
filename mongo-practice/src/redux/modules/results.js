import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_RESULTS = 'GET_RESULTS'

// ------------------------------------
// Actions
// ------------------------------------
export const getResults = createAction(GET_RESULTS, (results = 1) => results)


export const actions = {
  getResults
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [GET_RESULTS]: (state, { payload }) => payload
}, 1)
