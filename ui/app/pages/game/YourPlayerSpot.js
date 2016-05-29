var YourPlayerSpot = React.createClass({
  propTypes: {
    player: React.PropTypes.object.isRequired,
    gameState: React.PropTypes.string,
    cbFreeriderButton: React.PropTypes.func
  },

  render: function() {
    let statusData = this.status()
    let showButtons = 'false'
    if (!this.props.player.decided && this.props.gameState === 'waiting_for_round') {
      showButtons = ''
    }

    return (
      <div className={"col-lg-3 player-game-spot you text-center " + this.resultClass()}>
        <div className="name-points">
          <span className="name">{this.props.player.name}</span>
          <span className="cool-number">{this.props.player.points}</span>
        </div>
        <div className={'status ' + statusData['className']}> {statusData['text']} </div>
        <button className="btn btn-danger btn-lg freerider-button"
          disabled={showButtons} onClick={this.freeriderClick}> Steal a Ride </button>
        <button className="btn btn-success btn-lg freerider-button"
          disabled={showButtons} onClick={this.coolClick}> Buy Ticket </button>
      </div>
    );
  },

  freeriderClick() { this.props.cbFreeriderButton(true) },
  coolClick() { this.props.cbFreeriderButton(false) },
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
  status() {
    if (this.props.player.decided) {
      if (this.props.player.freerider) {
        return {
          text: 'selfish and ugly person',
          className: 'text-danger'
        }
      } else {
        return {
          text: 'beautiful and kind person',
          className: 'text-success'
        }
      }
    } else {
      return {
        text: 'who are you gonna be?',
        className: 'text-primary'
      }
    }
  }
});