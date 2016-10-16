import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import leaders from './modules/leaders'
import results from './modules/results'
import alcohol from './modules/alcohol'
import coord from './modules/coord'
import user from './modules/user'
import stores from './modules/stores'
import newAlcohol from './modules/newAlcohol'
import submitOrder from './modules/submitOrder'



export default combineReducers({
  counter,
  router,
  leaders,
  results,
  alcohol,
  coord,
  user,
  stores,
  newAlcohol,
  submitOrder
})
