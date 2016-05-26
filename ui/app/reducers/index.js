import { combineReducers } from 'redux'
import shared from '~/app/reducers/Shared'
import username from '~/app/reducers/Username'
import usersOnline from '~/app/reducers/UsersOnline'
import gamesList from '~/app/reducers/GamesList'
import createGameForm from '~/app/reducers/CreateGameForm'

const RootReducer = combineReducers({
  shared,
  username,
  usersOnline,
  gamesList,
  createGameForm
})

export default RootReducer
