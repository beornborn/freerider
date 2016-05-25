var OtherPlayerSpot = React.createClass({
  propTypes: {
    player: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className={"col-lg-3 player-game-spot other text-center " + this.resultClass()}>
        <div className="name-points text-center">
          <span className="name">{this.props.player.name}</span>
          <span className="cool-number">{this.props.player.points}</span>
        </div>
      </div>
    );
  },

  resultClass() {
    switch (this.props.player.winner) {
      case true:
        return 'winner'
      case false:
        return 'looser'
      default:
        return ''
    }
  },
});
