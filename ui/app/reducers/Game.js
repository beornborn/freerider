import update from 'react-addons-update'

export const ENTER_GAME = 'freerider/game/ENTER_GAME'
export const REFRESH_GAME = 'freerider/game/REFRESH_GAME'
export const LEAVE_GAME = 'freerider/game/LEAVE_GAME'
export const DECIDE = 'freerider/game/DECIDE'
export const MAYBE_NEXT_ROUND = 'freerider/game/MAYBE_NEXT_ROUND'

const initialState = {
  external: {
    players: [],
    game: {},
    winners: []
  }
}

export default function reducer(state = initialState, action) {
  const p = action.payload
  switch (action.type) {
    case ENTER_GAME, MAYBE_NEXT_ROUND:
      return state
    case REFRESH_GAME:
      return update(state, {external: {$set: p.data}})
    case LEAVE_GAME:
      return initialState
    case DECIDE:
      var index = state.external.players.findIndex(player => player.id === p.me.id)
      return update(state, {external: {players: {[index]: {decided: {$set: true}, freerider: {$set: p.decision}}}}})
    default:
      return state
  }
}

