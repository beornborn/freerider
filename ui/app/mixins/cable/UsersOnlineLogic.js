import { CreateMixin } from '~/app/mixins/cable/CableCommon'

function cableLogic(component) {
  return {
    connected() { console.log('connected users_online channel') },
    disconnected() { console.log('disconnected users_online channel') },
    received(data) {
      if (data === undefined) { return }
      console.log('users online got ' + data.msg)
      console.log(data)
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
