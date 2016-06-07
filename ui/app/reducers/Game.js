import update from 'react-addons-update'

export const UPDATE_KEY = 'freerider/game/UPDATE_KEY'
export const LEAVE_GAME = 'freerider/game/LEAVE_GAME'
export const START_STOPWATCH = 'freerider/game/START_STOPWATCH'
export const TICK_STOPWATCH = 'freerider/game/TICK_STOPWATCH'
export const DECIDE = 'freerider/game/DECIDE'

const initialState = {
  players: [],
  game: {},
  me: {},
  winners: [],
  stopwatch: {state: 'STOPPED', time: 0}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_KEY:
      return update(state, {[action.payload.key]: {$set: action.payload.value}})
    case LEAVE_GAME:
      return initialState
    case START_STOPWATCH:
      return update(state, {stopwatch: {time: {$set: action.payload.remainingTime}}})
    case TICK_STOPWATCH:
      return update(state, {stopwatch: {time: {$set: state.stopwatch.time - 1}}})
    case DECIDE:
    console.log('decide')
      var index = state.players.findIndex(p => p.id === state.me.id)
      return update(state, {players: {[index]: {decided: {$set: true}}},
        me: {decided: {$set: true}, freerider: {$set: action.payload.decision}}})
    default:
      return state
  }
}

