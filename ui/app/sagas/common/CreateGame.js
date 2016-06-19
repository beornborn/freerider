import { takeEvery } from 'redux-saga'
import { select, put, call } from 'redux-saga/effects'
import { CREATE_GAME_FORM_TOGGLE, CREATE_GAME_FORM_SUBMIT } from '~/app/reducers/Dashboard'
import { TOGGLE_SNACKBAR } from '~/app/reducers/Shared'
import { createAction } from 'redux-actions'
import { browserHistory } from 'react-router'

function* perform(action) {
  const personalChannel = yield select(state => state.shared.cable.PersonalChannel)
  yield call(personalChannel.createGame.bind(personalChannel), action.payload.formData)
  yield put(createAction(CREATE_GAME_FORM_TOGGLE)())
  yield put(createAction(TOGGLE_SNACKBAR)({message: 'Game created'}))
  yield call(browserHistory.push, '/game')
}

function* watch() {
  yield* takeEvery(CREATE_GAME_FORM_SUBMIT, perform)
}

export default watch
