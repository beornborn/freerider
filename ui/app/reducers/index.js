import { combineReducers } from 'redux'
import shared from '~/app/reducers/Shared'
import username from '~/app/reducers/Username'

const RootReducer = combineReducers({
  shared,
  username
})

export default RootReducer
