var update = React.addons.update

let Game = React.createClass({
  mixins: [AnimationMixin],
  componentWillMount() {
    this.gameChannel = App.cable.subscriptions.create("GameChannel", App.createGameChannel(this))
  },

  getInitialState() {
    return {players: [], game: {}, me: {}, winners: []};
  },

  render() {
    let withoutMeUsers = this.state.players.filter(p => p.id !== this.state.me.id)
    let me = this.state.players.filter(p => p.id === this.state.me.id)[0] || {}
    let winner_ids = this.state.winners.map(w => w.id)
    let winner_players = this.state.players.filter(p => winner_ids.includes(p.id))
    return (
      <div className="game-container">
        <GameInfo ref="gameInfo"
          players={this.state.players}
          game={this.state.game}
          stopwatch={this.stopwatch}
          winners={winner_players}
          cbStopwatchTimeout={this.cbStopwatchTimeout} />
        <YourPlayerSpot
          player={me}
          gameState={this.state.game.state}
          cbHitrojopButton={this.cbHitrojopButton}
          ref={'playerSpot' + me.id} />
        {withoutMeUsers.map(player => {
          return <OtherPlayerSpot player={player} key={player.id} ref={'playerSpot' + player.id}/>
        })}
      </div>
    );
  },

  newRound() {
    this.refs.gameInfo.refs.stopwatch.reset()
    if (this.state.game.current_round == 1) { return }

    var hitrojop = this.state.players.find((p) => { return p.previous_round_hitrojop })
    this.state.players.forEach((p) => {
      var spot = ReactDOM.findDOMNode(this.refs['playerSpot' +  p.id])
      if (!hitrojop) {
        this.animateNeutral(spot)
      } else if (p.previous_round_hitrojop) {
        this.animateSuccess(spot)
      } else {
        this.animateFailure(spot)
      }
    })
  },
  gameFinished() { },

  cbStopwatchTimeout() { this.gameChannel.maybeNextRound(this.state.game.current_round) },
  cbHitrojopButton(hitrojop) {
    var index = this.state.players.findIndex(p => p.id === this.state.me.id)
    updateCommand = {}
    updateCommand[index] = {decided: {$set: true}}
    var updatedPlayers = update(this.state.players, updateCommand)
    this.setState({players: updatedPlayers})
    this.gameChannel.decide({hitrojop: hitrojop, round: this.state.game.current_round})
  }
});
