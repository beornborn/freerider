let Game = React.createClass({
  componentDidMount() {
    this.game_channel = App.cable.subscriptions.create("GameChannel", App.createGameCommunicationLogic(this))
  },

  getInitialState: function() {
    return {users: [], game: {}};
  },

  render() {
    // let arr = [['Dan', 5], ['Aol', 25], ['Jogar', 15], ['Zakil', 6], ['Lenacha', 9], ['Dan', 5], ['Dan', 5], ['Dan', 5], ['Dan', 5], ['Dan', 5], ['Dan', 5], ['Dan', 5], ['Dan', 5], ['Dan', 5], ['Dan', 5], ['Dan', 5]]
    return (
      <div className="game-container">
        <YourPlayerSpot name="Oleg" points={1} />
        {this.state.users.map(user => {
          return <OtherPlayerSpot name={user.name} points={user.points} key={user.id} />
        })}
      </div>
    );
  }
});
