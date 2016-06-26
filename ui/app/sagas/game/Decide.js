import { takeEvery } from 'redux-saga'
import { select, put } from 'redux-saga/effects'
import { DECIDE } from '~/app/reducers/Game'
import { TOGGLE_SNACKBAR } from '~/app/reducers/Shared'
import { createAction } from 'redux-actions'

function* perform(action) {
  let channel = yield select(state => state.shared.cable.GameChannel)
  let current_round = yield select(state => state.game.external.game.current_round)
  channel.decide({freerider: action.payload.decision, current_round})
  yield put(createAction(TOGGLE_SNACKBAR)({message: 'You made decision'}))
}

function* watch() {
  yield* takeEvery(DECIDE, perform)
}

export default watch
