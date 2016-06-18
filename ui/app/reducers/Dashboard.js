import update from 'react-addons-update'
import { createAction } from 'redux-actions'

export const USERNAME_EDIT_TOGGLE_DIALOG = 'freerider/dashboard/USERNAME_EDIT_TOGGLE_DIALOG'

const initialState = {
  usernameEdit: {open: false}
}

export default function reducer(state = initialState, action) {
  const p = action.payload
  switch (action.type) {
    case USERNAME_EDIT_TOGGLE_DIALOG:
      return update(state, {usernameEdit: {open: {$set: !state.usernameEdit.open}}})
    default:
      return state
  }
}
