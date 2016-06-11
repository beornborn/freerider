import React from 'react'
import AnimationMixin from '~/app/mixins/AnimationMixin'
import CableMixin from '~/app/mixins/cable/GameLogic'
import CSSModules from 'react-css-modules'
import styles from './Game.css'
import { Card, CardTitle } from 'material-ui/Card'
import GameInfo from '~/app/components/game/GameInfo'
import UsersOnline from '~/app/containers/UsersOnline'
import Player from '~/app/components/game/Player'
import GameActions from '~/app/components/game/GameActions'
import LeaveGameButton from '~/app/containers/LeaveGameButton'

let Game = React.createClass({
  mixins: [AnimationMixin, CableMixin],

  render() {
    let me = this.props.players.filter(p => p.id === this.props.me.id)[0] || {}
    let winner_ids = this.props.winners.map(w => w.id)
    let winner_players = this.props.players.filter(p => winner_ids.includes(p.id))

    let actions = undefined
    if (this.props.game.state === 'waiting_for_round') {
      actions = <GameActions decide={this.props.decide} me={this.props.me} />
    }
    return (
      <div styleName="content">
        <Card styleName="game-card">
          <LeaveGameButton />
          <GameInfo ref="gameInfo"
            players={this.props.players}
            game={this.props.game}
            winners={winner_players}
            stopwatch={this.props.stopwatch} />
          {actions}
          <div>
            {this.playersElements()}
          </div>
        </Card>
        <Card styleName="users-online-card">
          <UsersOnline />
        </Card>
      </div>
    );
  },

  playersElements() {
    let players = []
    for (let i=0; i<this.props.game.players_amount; i++) {
      let player = this.props.players[i]
      let id = (player && player.id) || Math.random()
      players.push(<Player key={id} ref={'player' + id} player={player} gameState={this.props.game.state} />)
    }
    return players
  },

  newRound() {
    this.props.startStopwatch(this.props.game.time_to_think)
    if (this.props.game.current_round == 1) { return }

    // var freerider = this.props.players.find((p) => { return p.previous_round_freerider })
    // this.props.players.forEach((p) => {
    //   var spot = ReactDOM.findDOMNode(this.refs['player' +  p.id])
    //   if (!freerider) {
    //     this.animateNeutral(spot)
    //   } else if (p.previous_round_freerider) {
    //     this.animateSuccess(spot)
    //   } else {
    //     this.animateFailure(spot)
    //   }
    // })
  },

  continueAfterRefresh() {
    if (this.props.game.state === 'waiting_for_round') {
      var goneTime = Math.floor((Date.now() - Date.parse(this.props.game.last_round_on)) / 1000)
      var remainingTime = this.props.game.time_to_think - goneTime
      this.props.startStopwatch(remainingTime)
    }
  },

  cbFreeriderButton(freerider) {
    this.gameChannel.decide({freerider: freerider, round: this.props.game.current_round})
  }
})

export default CSSModules(Game, styles)
