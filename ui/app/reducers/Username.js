import update from 'react-addons-update'
import { createAction } from 'redux-actions'

export const TOGGLE_DIALOG = 'freerider/username/TOGGLE_DIALOG'
export const FORM_ALREADY_WAS_SUBMITTED = 'freerider/username/FORM_ALREADY_WAS_SUBMITTED'
export const CHANGE_NAME = 'freerider/username/CHANGE_NAME'

const initialState = {
  editDialog: {open: false, formNeverWasSubmitted: true},
  name: undefined
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DIALOG:
      return update(state, {editDialog: {open: {$set: !state.editDialog.open}}})
    case FORM_ALREADY_WAS_SUBMITTED:
      return update(state, {editDialog: {formNeverWasSubmitted: {$set: false}}})
    case CHANGE_NAME:
      return update(state, {name: {$set: action.payload.name}})
    default:
      return state
  }
}
