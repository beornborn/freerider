import { takeEvery, delay } from 'redux-saga'
import { select, put, call } from 'redux-saga/effects'
import { TOGGLE_FORM, CREATE_GAME } from '~/app/reducers/CreateGameForm'
import { TOGGLE_SNACKBAR } from '~/app/reducers/Shared'
import { createAction } from 'redux-actions'
import { browserHistory } from 'react-router'

function* createGame(action) {
  const personalChannel = yield select(state => state.shared.cable.PersonalChannel)
  yield call(personalChannel.createGame.bind(personalChannel), action.payload.formData)
  yield put(createAction(TOGGLE_FORM)())
  yield put(createAction(TOGGLE_SNACKBAR)({message: 'Game created'}))
  yield delay(5000)
  yield call(browserHistory.push, '/game')
}

function* watchCreateGame() {
  yield* takeEvery(CREATE_GAME, createGame)
}

export default watchCreateGame
