import { CreateMixin } from '~/app/mixins/cable/CableCommon'

function cableLogic(component) {
  return {
    connected() { },
    disconnected() { },
    received(data) {
      if (data === undefined) { return }
      switch (data.msg) {
        case 'connected':
          return this.perform("refresh", {})
        case 'refresh':
          return component.props.refreshUsers({
            users: data.users,
            changedUsersIds: data.changed_users_ids
          });
      }
    }
  }
}

export default CreateMixin("UsersOnlineChannel", cableLogic)
