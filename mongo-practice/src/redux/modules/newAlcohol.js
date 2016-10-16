import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const SEARCH_ALCOHOL = 'SEARCH_ALCOHOL'

// ------------------------------------
// Actions
// ------------------------------------
export const get_newAlcohol = createAction(SEARCH_ALCOHOL, (newAlcohol = 1) => newAlcohol)


export const actions = {
  get_newAlcohol
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SEARCH_ALCOHOL]: (state, { payload }) => payload
}, 1)
