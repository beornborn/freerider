let UsersItem = React.createClass({
  mixins: [AnimationMixin],
  propTypes: {
    user: React.PropTypes.object.isRequired,
    updated: React.PropTypes.bool
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.props.updated) {
      this.animateChange(ReactDOM.findDOMNode(this.refs.row))
    }
  },

  componentDidMount() {
    this.animateAppear(ReactDOM.findDOMNode(this.refs.row))
  },

  render() {
    return (
      <div className="player-name" key={'player-name-' + this.props.user.id} ref="row">{this.props.user.name}</div>
    )
  }
});
