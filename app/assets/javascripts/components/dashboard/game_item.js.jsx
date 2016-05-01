let GameItem = React.createClass({
  propTypes: {
    game: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <tr>
        <td>
          <a rel="nofollow" data-method="post" href={`/games/${this.props.game.id}/connect`}>{this.props.game.name}</a>
        </td>
        <td>{this.props.game.players.length + '/' + this.props.game.players_amount}</td>
        <td>{this.props.game.rounds}</td>
        <td>{this.props.game.time_to_think}</td>
      </tr>
    )
  }
});
