let GamesList = React.createClass({
  componentWillMount() {
    this.gameChannel = App.cable.subscriptions.create("GameListChannel", App.createGameListChannel(this))
  },

  getInitialState: function() {
    return {games: []};
  },

  render() {
    return (
      <div>
        <table className="table table-hover table-condensed games-table">
          <thead>
            <tr>
              <th> Name </th>
              <th> Players </th>
              <th> Rounds </th>
              <th> Time to Think (sec) </th>
            </tr>
          </thead>
          <tbody>
            {this.state.games.map(game => {
              return <GameItem game={game} key={game.id} />
            })}
          </tbody>
        </table>
      </div>
    )
  }
});
