import { takeEvery } from 'redux-saga'
import { select, put, call } from 'redux-saga/effects'
import { ENTER_GAME } from '~/app/reducers/Game'
import { TOGGLE_SNACKBAR } from '~/app/reducers/Shared'
import { createAction } from 'redux-actions'
import { browserHistory } from 'react-router'

function* perform(action) {
  const personalChannel = yield select(state => state.shared.cable.PersonalChannel)
  yield call(personalChannel.enterGame.bind(personalChannel), action.payload.gameId)
  yield put(createAction(TOGGLE_SNACKBAR)({message: 'Connected to the game'}))
  yield call(browserHistory.push, '/game')
}

function* watch() {
  yield* takeEvery(ENTER_GAME, perform)
}

export default watch
