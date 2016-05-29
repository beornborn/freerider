import update from 'react-addons-update'

export const UPDATE_KEY = 'freerider/game/UPDATE_KEY'
export const LEAVE_GAME = 'freerider/game/LEAVE_GAME'

const initialState = {
  players: [],
  game: {},
  me: {},
  winners: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_KEY:
      return update(state, {[action.payload.key]: {$set: action.payload.value}})
    case LEAVE_GAME:
      return initialState
    default:
      return state
  }
}
