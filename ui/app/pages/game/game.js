import React from 'react'
import AnimationMixin from '~/app/mixins/AnimationMixin'
import CableMixin from '~/app/mixins/cable/GameLogic'
import CSSModules from 'react-css-modules'
import styles from './Game.css'
import { Card, CardTitle } from 'material-ui/Card'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import { RaisedButton } from 'material-ui'
import GameInfo from '~/app/pages/game/GameInfo'
import UsersOnline from '~/app/containers/UsersOnline'
import Player from '~/app/pages/game/Player'

let Game = React.createClass({
  mixins: [AnimationMixin, CableMixin],

  render() {
    let me = this.props.players.filter(p => p.id === this.props.me.id)[0] || {}
    let winner_ids = this.props.winners.map(w => w.id)
    let winner_players = this.props.players.filter(p => winner_ids.includes(p.id))
    return (
      <div styleName="content">
        <Card styleName="game-card">
          <GameInfo ref="gameInfo"
            players={this.props.players}
            game={this.props.game}
            stopwatch={this.stopwatch}
            winners={winner_players}
            cbStopwatchTimeout={this.cbStopwatchTimeout} />
          <div styleName='actions'>
            <RaisedButton label="Buy Ticket" primary={true} styleName='action' />

            <div styleName='divider'>
              <ArrowBack styleName='arrow-back'/>or<ArrowForward styleName='arrow-forward'/>
            </div>


            <RaisedButton label="Ride Free" primary={true} styleName='action' />
          </div>
          <div>
            {this.props.players.map(player => {
              return <Player player={player} key={player.id} ref={'player' + player.id}/>
            })}
          </div>
        </Card>
        <Card styleName="users-online-card">
          <UsersOnline />
        </Card>
      </div>
    );
  },

  newRound() {
    this.refs.gameInfo.refs.stopwatch.reset(this.props.game.time_to_think)
    if (this.props.game.current_round == 1) { return }

    var freerider = this.props.players.find((p) => { return p.previous_round_freerider })
    this.props.players.forEach((p) => {
      var spot = ReactDOM.findDOMNode(this.refs['player' +  p.id])
      if (!freerider) {
        this.animateNeutral(spot)
      } else if (p.previous_round_freerider) {
        this.animateSuccess(spot)
      } else {
        this.animateFailure(spot)
      }
    })
  },
  gameFinished() { },
  continueAfterRefresh() {
    if (this.props.game.state === 'waiting_for_round') {
      var goneTime = Math.floor((Date.now() - Date.parse(this.props.game.last_round_on)) / 1000)
      var remainingTime = this.props.game.time_to_think - goneTime
      this.refs.gameInfo.refs.stopwatch.reset(remainingTime)
    }
  },

  cbStopwatchTimeout() { this.gameChannel.maybeNextRound(this.props.game.current_round) },
  cbFreeriderButton(freerider) {
    var index = this.props.players.findIndex(p => p.id === this.props.me.id)
    updateCommand = {}
    updateCommand[index] = {decided: {$set: true}}
    var updatedPlayers = update(this.props.players, updateCommand)
    this.setState({players: updatedPlayers})
    this.gameChannel.decide({freerider: freerider, round: this.props.game.current_round})
  }
})

export default CSSModules(Game, styles)
