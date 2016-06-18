import { takeEvery } from 'redux-saga'
import { select } from 'redux-saga/effects'
import { DECIDE } from '~/app/reducers/Game'

function* perform(action) {
  let state = yield select()
  state.shared.cable.GameChannel.decide({freerider: action.payload.decision})
}

function* watch() {
  yield* takeEvery(DECIDE, perform)
}

export default watch
