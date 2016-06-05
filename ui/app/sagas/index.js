import { takeEvery, takeLatest, delay } from 'redux-saga'
import { call, put, take, select } from 'redux-saga/effects'
import { START_STOPWATCH, TICK_STOPWATCH, STOP_STOPWATCH } from '~/app/reducers/Game'
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

export default function* watchStartStopwatch() {
  yield* takeLatest(START_STOPWATCH, startStopwatch)
}
