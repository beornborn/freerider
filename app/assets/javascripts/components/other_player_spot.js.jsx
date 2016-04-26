var OtherPlayerSpot = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    points: React.PropTypes.number.isRequired
  },

  render: function() {
    return (
      <div className="col-lg-3 user-game-spot other">
        <div className="name-points text-center">
          <span className="name">{this.props.name}</span>
          <span className="points text-primary">{this.props.points}</span>
        </div>
      </div>
    );
  }
});
