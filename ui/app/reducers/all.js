import update from 'react-addons-update'
import { ActionCable, Cable } from 'action-cable-react'

const initialState = {
  rulesOpen: false,
  currentUser: {},
  cable: new Cable({}),
  drower: {open: false},
  snackbar: {open: false, message: undefined}
}

const all = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_RULES':
      return update(state, {rulesOpen: {$set: action.open}})
    case 'TOGGLE_DROWER':
      return update(state, {drower: {open: {$set: !state.drower.open}}})
    case 'UPDATE_CURRENT_USER':
      return update(state, {currentUser: {$set: action.currentUser}})
    case 'CONNECT_CABLE':
      let actionCable = ActionCable.createConsumer('/cable')
      let cable = new Cable({
        UsersOnlineChannel: actionCable.subscriptions.create({channel: 'UsersOnlineChannel'}),
        GamesListChannel: actionCable.subscriptions.create({channel: 'GamesListChannel'})
      })
      return update(state, {cable: {$set: cable}})
    default:
      return state
  }
}

export default all
