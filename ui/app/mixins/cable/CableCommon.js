export function CreateMixin(channelName, cableLogic) {
  return {
    componentDidMount() {
      this.props.addSubscription(channelName, cableLogic(this))
    },

    componentWillUnmount() {
      this.props.removeSubscription(channelName)
    }
  }
}
