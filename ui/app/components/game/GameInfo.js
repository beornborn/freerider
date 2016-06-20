import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './GameInfo.css'
import AlarmIcon from 'material-ui/svg-icons/action/alarm'
import Theme from '~/app/FreeriderTheme'
import RefreshIndicator from 'material-ui/RefreshIndicator'

var GameInfo = React.createClass({
  propTypes: {
    players: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    winners: React.PropTypes.arrayOf(React.PropTypes.object),
    game: React.PropTypes.object.isRequired,
    stopwatch: React.PropTypes.object
  },

  render() {
    var { rounds, status, time } = this.content()
    return (
      <div styleName='info'>
        <div styleName='rounds'>{rounds}</div>
        <div styleName='status'>{status}</div>
        <div styleName='timer'>{time}</div>
      </div>
    )
  },

  content() {
    switch (this.props.game.state) {
      case 'waiting_for_start':
        let playersNumber = this.props.players.length + ' \\ ' + this.props.game.players_amount
        return {
          rounds: <RefreshIndicator
            status='loading'
            style={{position: 'relative', backgroundColor: 'none', boxShadow: 0}}
            loadingColor={Theme.commonSettings.palette.alternateTextColor}
            top={0}
            left={0}
            size={55} />,
          status: 'waiting for players',
          time: this.alarmArea(this.props.game.time_to_think)
        }
      case 'waiting_for_round':
        return {
          rounds: this.props.game.current_round,
          status: 'choose your move',
          time: this.alarmArea(this.props.stopwatch.time)
        }
      case 'finished':
        if (this.props.winners.length === 0) {
          return {status: 'Bus Company has bankrupted.. Everyone looses'}
        } else {
          let winners_view = this.props.winners.map(w => w.name).join(', ')
          return {status: `Bus company survived! Winners are: ${winners_view}`}
        }
      default:
        return {rounds: undefined, status: undefined, time: undefined}
    }
  },

  alarmArea(time) {
    return <div>
      <AlarmIcon styleName='alarm-icon' color={Theme.commonSettings.palette.alternateTextColor}/>
      {time}
    </div>
  }
})

export default CSSModules(GameInfo, styles)
