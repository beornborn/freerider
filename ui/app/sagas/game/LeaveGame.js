import { takeEvery } from 'redux-saga'
import { select, call, put } from 'redux-saga/effects'
import { TOGGLE_SNACKBAR } from '~/app/reducers/Shared'
import { LEAVE_GAME } from '~/app/reducers/Game'
import { browserHistory } from 'react-router'
import { createAction } from 'redux-actions'

function* perform(action) {
  const gameChannel = yield select(state => state.shared.cable.GameChannel)
  yield call(gameChannel.leave_game.bind(gameChannel))
  yield put(createAction(TOGGLE_SNACKBAR)({message: 'Left the game'}))
  yield call(browserHistory.push, '/')
}

function* watch() {
  yield* takeEvery(LEAVE_GAME, perform)
}

export default watch
