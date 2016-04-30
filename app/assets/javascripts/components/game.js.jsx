let Game = React.createClass({
  componentWillMount() {
    this.gameChannel = App.cable.subscriptions.create("GameChannel", App.createGameCommunicationLogic(this))
  },

  getInitialState: function() {
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
          cbHitrojopButton={this.cbHitrojopButton} />
        {withoutMeUsers.map(player => {
          return <OtherPlayerSpot player={player} key={player.id} />
        })}
      </div>
    );
  },

  newRound() { this.refs.gameInfo.refs.stopwatch.reset() },
  gameFinished() { },

  cbStopwatchTimeout() { this.gameChannel.maybeNextRound(this.state.game.current_round) },
  cbHitrojopButton(hitrojop) { this.gameChannel.decide({hitrojop: hitrojop, round: this.state.game.current_round}) }
});
