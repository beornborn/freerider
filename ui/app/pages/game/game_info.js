var GameInfo = React.createClass({
  propTypes: {
    players: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    winners: React.PropTypes.arrayOf(React.PropTypes.object),
    game: React.PropTypes.object.isRequired,
    cbStopwatchTimeout: React.PropTypes.func
  },

  render() {
    return (
      <div className="col-lg-12 game-info">
        {this.content()}
      </div>
    )
  },

  content() {
    switch (this.props.game.state) {
      case 'waiting_for_start':
        let playersNumber = this.props.players.length + ' \\ ' + this.props.game.players_amount
        return (
          <div>
            <div className="col-lg-4">
              <span> Waiting for players: </span>
              <span className="cool-number"> {playersNumber} </span>
            </div>
            <div className="col-lg-4">
              <span>Rounds:</span>
              <span className="cool-number"> {this.props.game.rounds} </span>
            </div>
            <div className="col-lg-4">
              <span> Time to think: </span>
              <span className="cool-number">
                <Stopwatch ref="stopwatch" time={this.props.game.time_to_think} />
              </span>
            </div>
          </div>
        )
      case 'waiting_for_round':
        let decidedCount = this.props.players.filter(u => u.decided).length
        let decisionMadeCount = decidedCount + ' \\ ' + this.props.game.players_amount
        return (
          <div>
            <div className="col-lg-4">
              <span> Round </span>
              <span className="cool-number">{this.props.game.current_round}</span>
              <span> of </span>
              <span className="cool-number">{this.props.game.rounds + ": "}</span>
              <span className="cool-number">
                <Stopwatch ref="stopwatch"
                    time={this.props.game.time_to_think}
                    cbTimeout={this.props.cbStopwatchTimeout} />
              </span>
            </div>
            <div className="col-lg-8">
              <span>Decision Made: </span>
              <span className="cool-number">{decisionMadeCount}</span>
            </div>
          </div>
        )
      case 'finished':
        if (this.props.winners.length === 0) {
          return <div className="text-danger text-center">Bus Company has bankrupted.. Shame on you! </div>
        } else {
          let winners_view = this.props.winners.map(w => w.name).join(', ')
          return <div className="text-success text-center">Bus company survived! Winners are: {winners_view}</div>
        }
      default:
        return 'loading'
    }
  }
});
