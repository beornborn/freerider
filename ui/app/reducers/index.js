import { combineReducers } from 'redux'
import shared from '~/app/reducers/Shared'
import username from '~/app/reducers/Username'
import usersOnline from '~/app/reducers/UsersOnline'
import gamesList from '~/app/reducers/GamesList'
import createGameForm from '~/app/reducers/CreateGameForm'
import game from '~/app/reducers/Game'
import { reducer as formReducer } from 'redux-form'

const RootReducer = combineReducers({
  form: formReducer,
  shared,
  username,
  usersOnline,
  gamesList,
  createGameForm,
  game
})

export default RootReducer
