import update from 'react-addons-update'

export const ENTER_GAME = 'freerider/game/ENTER_GAME'
export const REFRESH_GAME = 'freerider/game/REFRESH_GAME'
export const LEAVE_GAME = 'freerider/game/LEAVE_GAME'
export const START_STOPWATCH = 'freerider/game/START_STOPWATCH'
export const TICK_STOPWATCH = 'freerider/game/TICK_STOPWATCH'
export const DECIDE = 'freerider/game/DECIDE'

const initialState = {
  external: {
    players: [],
    game: {},
    winners: []
  },
  stopwatch: {state: 'STOPPED', time: 0}
}

export default function reducer(state = initialState, action) {
  const p = action.payload
  switch (action.type) {
    case ENTER_GAME:
      return state
    case REFRESH_GAME:
      return update(state, {external: {$set: p.data}})
    case LEAVE_GAME:
      return initialState
    case START_STOPWATCH:
      return update(state, {stopwatch: {time: {$set: action.payload.remainingTime}}})
    case TICK_STOPWATCH:
      return update(state, {stopwatch: {time: {$set: state.stopwatch.time - 1}}})
    case DECIDE:
      var index = state.players.findIndex(p => p.id === state.me.id)
      return update(state, {players: {[index]: {decided: {$set: true}}},
        me: {decided: {$set: true}, freerider: {$set: action.payload.decision}}})
    default:
      return state
  }
}

