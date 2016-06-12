import { delay } from 'redux-saga'
import { select, call, take, fork } from 'redux-saga/effects'
import { ADD_CHANNEL_SUBSCRIPTION } from '~/app/reducers/Shared'

export function* pollUsersOnline() {
  let personalChannel = yield select(state => state.shared.cable.PersonalChannel)

  if (!personalChannel) {
    yield take(action => {
      return action.type === ADD_CHANNEL_SUBSCRIPTION && action.payload.channel === 'PersonalChannel'
    })
    personalChannel = yield select(state => state.shared.cable.PersonalChannel)
  }

  while(true) {
    yield call(personalChannel.pollUsersOnline.bind(personalChannel))
    yield delay(5000)
  }
}

export default pollUsersOnline()
