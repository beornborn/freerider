import watchInit from '~/app/sagas/common/Init'
import watchUpdateName from '~/app/sagas/common/UpdateName'
import watchAddChannelSubscription from '~/app/sagas/common/AddChannelSubscription'
import watchCreateGame from '~/app/sagas/common/CreateGame'

const commonSagas = [
  watchInit(),
  watchUpdateName(),
  watchAddChannelSubscription(),
  watchCreateGame()
]

export default commonSagas
