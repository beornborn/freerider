import update from 'react-addons-update'
export const TOGGLE_FORM = 'freerider/create_game_form/TOGGLE_FORM'
export const CREATE_GAME = 'freerider/create_game_form/CREATE_GAME'

let initialState = {
  open: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FORM:
      return update(state, {open: {$set: !state.open}})
    case CREATE_GAME:
      return state
    default:
      return state
  }
}
