let GamesList = React.createClass({
  componentWillMount() {
    this.gameChannel = App.cable.subscriptions.create("GameListChannel", App.createGameListChannel(this))
  },

  getInitialState: function() {
    return {games: [], changedGamesIds: []};
  },

  render() {
    return (
      <div className='rTable'>
        <div className='rTableHeading'>
          <div className='rTableRow'>
            <div className='rTableCell'> Name </div>
            <div className='rTableCell'> Players </div>
            <div className='rTableCell'> Rounds </div>
            <div className='rTableCell'> Time to Think (sec) </div>
          </div>
        </div>
        <div className='rTableBody'>
          {this.state.games.map(game => {
            return <GameItem game={game} key={game.id} updated={this.state.changedGamesIds.includes(game.id)} />
          })}
        </div>
      </div>
    )
  }
});
