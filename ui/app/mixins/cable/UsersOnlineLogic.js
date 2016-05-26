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

const CHANNEL_NAME = "UsersOnlineChannel"

const CableMixin = {
  componentDidMount() {
    if (this.props.cable.connected) {
      this.createSubscription()
    }
  },

  componentDidUpdate(prevProps) {
    if (!prevProps.cable.connected && this.props.cable.connected) {
      this.createSubscription()
    }
  },

  componentWillUnmount() {
    this.props.removeSubscription(CHANNEL_NAME)
  },

  createSubscription() {
    const subscription = this.props.cable.consumer.subscriptions.create(CHANNEL_NAME, cableLogic(this))
    this.props.addSubscription(CHANNEL_NAME, subscription)
  }
}

export default CableMixin
