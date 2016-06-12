import watchInit from '~/app/sagas/common/Init'
import watchUpdateName from '~/app/sagas/common/UpdateName'
import watchAddChannelSubscription from '~/app/sagas/common/AddChannelSubscription'

const commonSagas = [
  watchInit(),
  watchUpdateName(),
  watchAddChannelSubscription()
]

export default commonSagas
