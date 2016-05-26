function cableLogic(component) {
  return {
    connected() { console.log('connected games_list channel') },
    disconnected() { console.log('disconnected games_list channel') },

    received(data) {
      if (data === undefined) { return }
      console.log('game list got ' + data.msg)
      console.log(data)
      switch (data.msg) {
        case 'refresh':
          return component.props.refreshGames({games: data.games, changedGamesIds: data.changed_games_ids})
      }
    },
  }
}

const CHANNEL_NAME = "GamesListChannel"

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
