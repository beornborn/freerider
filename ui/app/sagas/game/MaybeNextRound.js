import { takeEvery } from 'redux-saga'
import { select } from 'redux-saga/effects'
import { MAYBE_NEXT_ROUND } from '~/app/reducers/Game'
import { createAction } from 'redux-actions'

function* perform(action) {
  let channel = yield select(state => state.shared.cable.GameChannel)
  let current_round = yield select(state => state.game.external.game.current_round)
  channel.maybeNextRound(current_round)
}

function* watch() {
  yield* takeEvery(MAYBE_NEXT_ROUND, perform)
}

export default watch
