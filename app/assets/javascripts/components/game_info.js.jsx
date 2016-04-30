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
        let playersNumber = this.props.players.length + '\\' + this.props.game.players_amount
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
        let decisionMadeCount = decidedCount + '\\' + this.props.game.players_amount
        return (
          <div>
            <div className="col-lg-4">
              <span> Round </span>
              <span className="cool-number">{this.props.game.current_round}</span>
              <span> of </span>
              <span className="cool-number">{this.props.game.rounds}</span>
            </div>
            <div className="col-lg-4">
              <span className="cool-number">
                <Stopwatch ref="stopwatch"
                  time={this.props.game.time_to_think}
                  cbTimeout={this.props.cbStopwatchTimeout} />
              </span>
            </div>
            <div className="col-lg-4">
              <span>Decision Made: </span>
              <span className="cool-number">{decisionMadeCount}</span>
            </div>
          </div>
        )
      case 'finished':
        let message;
        if (this.props.winners.length === 0) {
          message = <div className="text-danger text-center low-mt">You are all nasty, horrible, lousy, selfinsh LOOSERS! Shame on you! BOOOOO!!</div>
        } else {
          let winners_view = this.props.winners.map(w => w.name).join(', ')
          message = <div className="text-success text-center low-mt">Winners are: {winners_view}</div>
        }
        return (
          <div>
            <div className="text-success text-center">Game Over! Thanks for playing!</div>
            {message}
          </div>
        )
      default:
        return 'loading'
    }
  }
});
