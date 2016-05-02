let GameItem = React.createClass({
  propTypes: {
    game: React.PropTypes.object.isRequired,
    updated: React.PropTypes.bool
  },

  componentDidUpdate(prevProps, prevState) {
    this.animateChange()
  },

  componentDidMount() {
    this.animateAppear()
  },

  render() {
    return (
      <div className="rTableRow game-list-row" ref={this.currentRef()} >
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

  animateAppear() {
    var row = ReactDOM.findDOMNode(this.refs[this.currentRef()])
    row.style.opacity = 0
    row.addEventListener('transitionend', ()=>{
      setTimeout(() => {
        row.style.opacity = 1
        row.classList.remove("animated-state-appear")
      }, 10)
    })
    setTimeout(() => { row.className += " animated-state-appear" }, 10)
  },

  animateChange(row) {
    var row = ReactDOM.findDOMNode(this.refs[this.currentRef()])
    if (this.props.updated) {
      row.addEventListener('transitionend', ()=>{
        setTimeout(() => { row.classList.remove("animated-state-update") }, 10)
      })
      setTimeout(() => { row.className += " animated-state-update" }, 10)
    } // TODO why doesn't work without setTimeout?
  }
});
