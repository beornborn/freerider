import watchInit from '~/app/sagas/shared/Init'
import watchAddChannelSubscription from '~/app/sagas/shared/AddChannelSubscription'

const sharedSagas = [
  watchInit(),
  watchAddChannelSubscription()
]

export default sharedSagas
