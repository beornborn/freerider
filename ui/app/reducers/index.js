import { combineReducers } from 'redux'
import shared from '~/app/reducers/Shared'
import username from '~/app/reducers/Username'
import usersOnline from '~/app/reducers/UsersOnline'
import gamesList from '~/app/reducers/GamesList'

const RootReducer = combineReducers({
  shared,
  username,
  usersOnline,
  gamesList
})

export default RootReducer
