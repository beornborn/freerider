import update from 'react-addons-update'
import { ActionCable, Cable } from 'action-cable-react'

const initialState = {
  rulesOpen: false,
  currentUser: {},
  cable: new Cable({}),
  drower: {open: false},
  snackbar: {open: false, message: ''},
  username: {editDialog: {open: false, formNeverWasSubmitted: true, name: undefined}}
}

const all = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_EDIT_USERNAME_DIALOG':
      return update(state, {username: {editDialog: {open: {$set: !state.username.editDialog.open}}}})
    case 'TOGGLE_RULES':
      return update(state, {rulesOpen: {$set: action.open}})
    case 'TOGGLE_DROWER':
      return update(state, {drower: {open: {$set: !state.drower.open}}})
    case 'SHOW_SNACKBAR':
      return update(state, {snackbar: {open: {$set: true}, message: {$set: action.message}}})
    case 'HIDE_SNACKBAR':
      return update(state, {snackbar: {open: {$set: false}, message: {$set: ''}}})
    case 'SUBMIT_EDIT_USERNAME_FORM':
      return update(state, {username: {editDialog: {formNeverWasSubmitted: {$set: false}}}})
    case 'UPDATE_CURRENT_USER':
      return update(state, {
        currentUser: {$set: action.currentUser},
        username: {editDialog: {name: {$set: action.currentUser.name}}}
      })
    case 'HANDLE_CHANGE_NAME':
      return update(state, {username: {editDialog: {name: {$set: action.name}}}})
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
