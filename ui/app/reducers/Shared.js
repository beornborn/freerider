import update from 'react-addons-update'
import Cable from 'es6-actioncable'

export const CONNECT_CABLE = 'freerider/shared/CONNECT_CABLE'
export const TOGGLE_DROWER = 'freerider/shared/TOGGLE_DROWER'
export const TOGGLE_RULES = 'freerider/shared/TOGGLE_RULES'
export const TOGGLE_SNACKBAR = 'freerider/shared/TOGGLE_SNACKBAR'
export const UPDATE_CURRENT_USER = 'freerider/shared/UPDATE_CURRENT_USER'
export const ADD_CHANNEL_SUBSCRIPTION = 'freerider/shared/ADD_CHANNEL_SUBSCRIPTION'
export const REMOVE_CHANNEL_SUBSCRIPTION = 'freerider/shared/REMOVE_CHANNEL_SUBSCRIPTION'

const initialState = {
  rules: {open: false},
  currentUser: {},
  cable: {consumer: {}, connected: false},
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
      return update(state, {currentUser: {$set: action.payload.currentUser}, currentUserLoaded: {$set: true}})
    case CONNECT_CABLE:
      const consumer = Cable.createConsumer('ws://' + window.location.host + '/cable')
      return update(state, {cable: {consumer: {$set: consumer}, connected: {$set: true}}})
    case ADD_CHANNEL_SUBSCRIPTION:
      return update(state, {cable: {[action.payload.channel]: {$set: action.payload.subscription}}})
    case REMOVE_CHANNEL_SUBSCRIPTION:
      state.cable[action.payload.channel].unsubscribe()
      return update(state, {cable: {[action.payload.channel]: {$set: undefined}}})
    default:
      return state
  }
}

