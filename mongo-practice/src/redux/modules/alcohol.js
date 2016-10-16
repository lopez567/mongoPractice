import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_ALCOHOL = 'GET_ALCOHOL'

// ------------------------------------
// Actions
// ------------------------------------
export const getAlcohol = createAction(GET_ALCOHOL, (Alcohol = 1) => Alcohol)


export const actions = {
  getAlcohol
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [GET_ALCOHOL]: (state, { payload }) => payload
}, [{name:'Sup'}])
