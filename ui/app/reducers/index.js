import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import shared from '~/app/reducers/Shared'
import dashboard from '~/app/reducers/Dashboard'
import game from '~/app/reducers/Game'

const RootReducer = combineReducers({
  form: formReducer,
  shared,
  dashboard,
  game
})

export default RootReducer
