import update from 'react-addons-update'

export const REFRESH = 'freerider/games_list/REFRESH'

const initialState = {
  games: [],
  changedGamesIds: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH:
      return update(state, {games: {$set: action.payload.games}, changedGamesIds: {$set: action.payload.changedGamesIds}})
    default:
      return state
  }
}
