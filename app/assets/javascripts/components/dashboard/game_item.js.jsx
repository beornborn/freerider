let GameItem = React.createClass({
  propTypes: {
    game: React.PropTypes.object.isRequired,
    updated: React.PropTypes.bool
  },

  componentDidUpdate(prevProps, prevState) {
    this.animateIfChanged()
  },

  componentDidMount(){
    this.animateIfChanged()
  },

  render() {
    return (
      <div className="rTableRow animated game-list-row" ref={this.currentRef()} >
        <div className='rTableCell'>
          <a rel="nofollow" data-method="post" href={`/games/${this.props.game.id}/connect`}>{this.props.game.name}</a>
        </div>
        <div className='rTableCell'>{this.props.game.players.length + '/' + this.props.game.players_amount}</div>
        <div className='rTableCell'>{this.props.game.rounds}</div>
        <div className='rTableCell'>{this.props.game.time_to_think}</div>
      </div>
    )
  },

  currentRef() {
    return 'game' + this.props.game.id
  },

  animateIfChanged() {
    var row = ReactDOM.findDOMNode(this.refs[this.currentRef()])
    if (row && this.props.updated) {
      row.addEventListener('transitionend', ()=>{
        setTimeout(() => { row.classList.remove("animated-state") }, 1)
      })
      setTimeout(() => { row.className += " animated-state" }, 1)
    } // TODO why doesn't work without setTimeout?
  }
});
