import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_ORDER = 'UPDATE_ORDER'

// ------------------------------------
// Actions
// ------------------------------------
export const update_submitOrder = createAction(UPDATE_ORDER, (submitOrder = 0) => submitOrder)

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
// reducer take care of this logic.

export const actions = {
  update_submitOrder
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [UPDATE_ORDER]: (state, { payload }) => payload
}, 0)
