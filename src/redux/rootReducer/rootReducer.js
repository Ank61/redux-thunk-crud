import { combineReducers } from 'redux'
import userReducer from '../user/userReducer'

const rootReducer = combineReducers({
  // cake: cakeReducer,
  // iceCream: iceCreamReducer,
  user: userReducer
})

export default rootReducer
