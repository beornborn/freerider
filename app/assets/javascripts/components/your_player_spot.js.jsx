var YourPlayerSpot = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    points: React.PropTypes.number.isRequired
  },

  render: function() {
    return (
      <div className="col-lg-3 user-game-spot you text-center">
        <div className="name-points">
          <span className="name">{this.props.name}</span>
          <span className="points text-primary">{this.props.points}</span>
        </div>
        <div className="status text-success"> beautiful and kind person </div>
        <button className="btn btn-danger btn-lg hitrojop-button"> become Hitrojop! </button>
        <button className="btn btn-success btn-lg hitrojop-button"> be Cool! </button>
      </div>
    );
  }
});
