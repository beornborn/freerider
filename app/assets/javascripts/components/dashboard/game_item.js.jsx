let GameItem = React.createClass({
  mixins: [AnimationMixin],
  propTypes: {
    game: React.PropTypes.object.isRequired,
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
      <div className="rTableRow game-list-row" ref="row" onClick={this.connectToGame} >
        <div className='rTableCell'>
          <a ref="link" rel="nofollow" data-method="post" href={`/games/${this.props.game.id}/connect`}>{this.props.game.name}</a>
        </div>
        <div className='rTableCell'>{this.props.game.players.length + '/' + this.props.game.players_amount}</div>
        <div className='rTableCell'>{this.props.game.rounds}</div>
        <div className='rTableCell'>{this.props.game.time_to_think}</div>
      </div>
    )
  },

  connectToGame() {
    this.refs.link.click()
  }
});
