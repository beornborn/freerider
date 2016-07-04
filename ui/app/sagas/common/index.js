import watchInit from '~/app/sagas/common/Init'
import watchUpdateName from '~/app/sagas/common/UpdateName'
import watchAddChannelSubscription from '~/app/sagas/common/AddChannelSubscription'
import watchCreateGame from '~/app/sagas/common/CreateGame'
import watchEnterGame from '~/app/sagas/common/EnterGame'
import watchLeaveGame from '~/app/sagas/common/LeaveGame'
import watchSendMessage from '~/app/sagas/common/SendMessage'

const commonSagas = [
  watchInit(),
  watchUpdateName(),
  watchAddChannelSubscription(),
  watchCreateGame(),
  watchEnterGame(),
  watchLeaveGame(),
  watchSendMessage()
]

export default commonSagas
