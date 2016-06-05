import update from 'react-addons-update'
export const TOGGLE_FORM = 'freerider/create_game_form/TOGGLE_FORM'
export const CHANGE_NAME = 'freerider/create_game_form/CHANGE_NAME'
export const CHANGE_PLAYERS = 'freerider/create_game_form/CHANGE_PLAYERS'
export const CHANGE_ROUNDS = 'freerider/create_game_form/CHANGE_ROUNDS'
export const CHANGE_TIME = 'freerider/create_game_form/CHANGE_TIME'
export const FORM_ALREADY_WAS_SUBMITTED = 'freerider/create_game_form/FORM_ALREADY_WAS_SUBMITTED'

let initialState = {
  open: false,
  formNeverWasSubmitted: true,
  name: '',
  players: undefined,
  rounds: undefined,
  time: undefined
}

if (process.env.NODE_ENV === 'dev') {
  initialState = {
    open: false,
    formNeverWasSubmitted: true,
    name: Math.round(Math.random() * 1000),
    players: 2,
    rounds: 3,
    time: 15
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FORM:
      return update(state, {open: {$set: !state.open}})
    case CHANGE_NAME:
      return update(state, {name: {$set: action.payload.name}})
    case CHANGE_PLAYERS:
      return update(state, {players: {$set: action.payload.players}})
    case CHANGE_ROUNDS:
      return update(state, {rounds: {$set: action.payload.rounds}})
    case CHANGE_TIME:
      return update(state, {time: {$set: action.payload.time}})
    case FORM_ALREADY_WAS_SUBMITTED:
      return update(state, {formNeverWasSubmitted: {$set: false}})
    default:
      return state
  }
}
