import { takeLatest, delay } from 'redux-saga'
import { put, select } from 'redux-saga/effects'
import { START_STOPWATCH, TICK_STOPWATCH } from '~/app/reducers/Game'
import { createAction } from 'redux-actions'

function* perform() {
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

function* watch() {
  yield* takeLatest(START_STOPWATCH, perform)
}

export default watch
