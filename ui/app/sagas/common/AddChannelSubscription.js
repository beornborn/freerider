import { takeEvery, delay } from 'redux-saga'
import { put, select, call, take } from 'redux-saga/effects'
import { ADD_CHANNEL_SUBSCRIPTION_WHEN_READY, ADD_CHANNEL_SUBSCRIPTION, SET_CABLE } from '~/app/reducers/Shared'
import { createAction } from 'redux-actions'
import { init } from '~/app/sagas/common/Init'
import * as api from '~/app/api'

function* perform(action) {
  let consumer = yield select(state => state.shared.cable.consumer)
  if (!consumer.url) {
    yield take(SET_CABLE)
    consumer = yield select(state => state.shared.cable.consumer)
  }

  const { channel, settings } = action.payload
  let channel_data = {channel}
  if (settings.inGame) { channel_data['is_game_chat'] = true }
  const subscription = yield call(consumer.subscriptions.create.bind(consumer.subscriptions), channel_data, settings)
  yield put(createAction(ADD_CHANNEL_SUBSCRIPTION)({channel, subscription}))
}

function* watch() {
  yield* takeEvery(ADD_CHANNEL_SUBSCRIPTION_WHEN_READY, perform)
}

export default watch
