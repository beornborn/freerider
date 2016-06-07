import { takeEvery, takeLatest, delay } from 'redux-saga'
import { call, put, take, select } from 'redux-saga/effects'
import { START_STOPWATCH, TICK_STOPWATCH, DECIDE } from '~/app/reducers/Game'
import { createAction } from 'redux-actions'

function* startStopwatch() {
  while(true) {
    yield delay(1000)
    let state = yield select()
    if (state.game.stopwatch.time > 0) {
      yield put(createAction(TICK_STOPWATCH)())
    } else {
      state.shared.cable.GameChannel.maybeNextRound(state.game.game.current_round)
      break
    }
  }
}

function* watchStartStopwatch() {
  yield* takeLatest(START_STOPWATCH, startStopwatch)
}

function* sendDecision(action) {
  let state = yield select()
  state.shared.cable.GameChannel.decide({freerider: action.payload.decision})
}

function* watchDecide() {
  yield* takeEvery(DECIDE, sendDecision)
}

export default function* rootSaga() {
  yield [
    watchStartStopwatch(),
    watchDecide()
  ]
}
