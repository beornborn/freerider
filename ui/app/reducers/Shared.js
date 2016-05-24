import update from 'react-addons-update'
import { ActionCable, Cable } from 'action-cable-react'
import * as api from '~/app/api'
import { createAction } from 'redux-actions'
import { CHANGE_NAME } from '~/app/reducers/Username'

export const CONNECT_CABLE = 'freerider/shared/CONNECT_CABLE'
export const TOGGLE_DROWER = 'freerider/shared/TOGGLE_DROWER'
export const TOGGLE_RULES = 'freerider/shared/TOGGLE_RULES'
export const TOGGLE_SNACKBAR = 'freerider/shared/TOGGLE_SNACKBAR'
export const UPDATE_CURRENT_USER = 'freerider/shared/UPDATE_CURRENT_USER'

const initialState = {
  rules: {open: false},
  currentUser: {},
  cable: new Cable({}),
  drower: {open: false},
  snackbar: {open: false, message: ''}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_RULES:
      return update(state, {rules: {open: {$set: !state.rules.open}}})
    case TOGGLE_DROWER:
      return update(state, {drower: {open: {$set: !state.drower.open}}})
    case TOGGLE_SNACKBAR:
      return update(state, {snackbar: {open: {$set: !state.snackbar.open}, message: {$set: action.payload.message}}})
    case UPDATE_CURRENT_USER:
      return update(state, {currentUser: {$set: action.payload.currentUser}})
    case CONNECT_CABLE:
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

export function getCurrentUser(dispatch) {
  return api.getCurrentUser().then(currentUser => {
    dispatch(createAction(CHANGE_NAME)({name: currentUser.name}))
    dispatch(createAction(UPDATE_CURRENT_USER)({currentUser}))
    return new Promise((resolve) => {resolve()})
  })
}
