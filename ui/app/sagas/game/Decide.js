import { takeEvery } from 'redux-saga'
import { select } from 'redux-saga/effects'
import { DECIDE } from '~/app/reducers/Game'

function* sendDecision(action) {
  let state = yield select()
  state.shared.cable.GameChannel.decide({freerider: action.payload.decision})
}

function* watchDecide() {
  yield* takeEvery(DECIDE, sendDecision)
}

export default watchDecide
