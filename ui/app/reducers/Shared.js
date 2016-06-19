import update from 'react-addons-update'

export const TOGGLE_RULES = 'freerider/shared/TOGGLE_RULES'
export const TOGGLE_DROWER = 'freerider/shared/TOGGLE_DROWER'
export const TOGGLE_SNACKBAR = 'freerider/shared/TOGGLE_SNACKBAR'
export const UPDATE_CURRENT_USER = 'freerider/shared/UPDATE_CURRENT_USER'
export const SET_CABLE = 'freerider/shared/SET_CABLE'
export const ADD_CHANNEL_SUBSCRIPTION = 'freerider/shared/ADD_CHANNEL_SUBSCRIPTION'
export const REMOVE_CHANNEL_SUBSCRIPTION = 'freerider/shared/REMOVE_CHANNEL_SUBSCRIPTION'
export const INIT = 'freerider/shared/INIT'
export const ADD_CHANNEL_SUBSCRIPTION_WHEN_READY = 'freerider/shared/ADD_CHANNEL_SUBSCRIPTION_WHEN_READY'

const initialState = {
  rules: {open: false},
  currentUser: {connected_player: {}},
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
    case SET_CABLE:
      return update(state, {cable: {consumer: {$set: action.payload.consumer}, connected: {$set: true}}})
    case ADD_CHANNEL_SUBSCRIPTION:
      return update(state, {cable: {[action.payload.channel]: {$set: action.payload.subscription}}})
    case REMOVE_CHANNEL_SUBSCRIPTION:
      state.cable[action.payload.channel].unsubscribe()
      return update(state, {cable: {[action.payload.channel]: {$set: undefined}}})
    case INIT, ADD_CHANNEL_SUBSCRIPTION_WHEN_READY:
      return state
    default:
      return state
  }
}

