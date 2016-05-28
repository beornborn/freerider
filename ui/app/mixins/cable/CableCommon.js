import { ADD_CHANNEL_SUBSCRIPTION, REMOVE_CHANNEL_SUBSCRIPTION } from '~/app/reducers/Shared'

export function CreateMixin(channelName, cableLogic) {
  return {
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
      this.props.removeSubscription(channelName)
    },

    createSubscription() {
      const subscription = this.props.cable.consumer.subscriptions.create(channelName, cableLogic(this))
      this.props.addSubscription(channelName, subscription)
    }
  }
}
