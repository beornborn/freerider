import { takeEvery } from 'redux-saga'
import { select, call, put } from 'redux-saga/effects'
import { USERNAME_EDIT_FORM_SUBMIT, USERNAME_EDIT_FORM_TOGGLE } from '~/app/reducers/Dashboard'
import { TOGGLE_SNACKBAR } from '~/app/reducers/Shared'
import { createAction } from 'redux-actions'

export function* updateName(action) {
  const personalChannel = yield select(state => state.shared.cable.PersonalChannel)
  yield call(personalChannel.updateName.bind(personalChannel), action.payload.formData.name)
  yield put(createAction(USERNAME_EDIT_FORM_TOGGLE)())
  yield put(createAction(TOGGLE_SNACKBAR)({message: 'Username Updated'}))
}

function* watch() {
  yield* takeEvery(USERNAME_EDIT_FORM_SUBMIT, updateName)
}

export default watch
