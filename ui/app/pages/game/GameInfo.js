import React from 'react'
import Stopwatch from '~/app/pages/game/Stopwatch'
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
    cbStopwatchTimeout: React.PropTypes.func
  },

  render() {
    var { rounds, status, time } = this.content()
    return (
      <div styleName='info'>
        <div styleName='rounds'>{rounds}</div>
        <div styleName='status'>{status}</div>
        <div styleName='timer'>
          <AlarmIcon styleName='alarm-icon' color={Theme.commonSettings.palette.alternateTextColor}/>
          {time}
        </div>
      </div>
    )
  },

  content() {
    console.log(this.props.game.state)
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
          time: this.props.game.time_to_think
        }
        // return {rounds: }
        //       <span className="cool-number"> {playersNumber} </span>
        //     </div>
        //     <div className="col-lg-4">
        //       <span>Rounds:</span>
        //       <span className="cool-number"> {this.props.game.rounds} </span>
        //     </div>
        //     <div className="col-lg-4">
        //       <span> Time to think: </span>
        //       <span className="cool-number">
        //         <AlarmIcon />
        //         <Stopwatch ref="stopwatch" time={this.props.game.time_to_think} />
        //       </span>
        //     </div>
        //   </div>
        // )
      case 'waiting_for_round':
        let decidedCount = this.props.players.filter(u => u.decided).length
        let decisionMadeCount = decidedCount + ' \\ ' + this.props.game.players_amount
        return (
          <div>
            <div className="col-lg-4">
              <span> Round </span>
              <span className="cool-number">{this.props.game.current_round}</span>
              <span> of </span>
              <span className="cool-number">{this.props.game.rounds + ": "}</span>
              <span className="cool-number">
                <Stopwatch ref="stopwatch"
                    time={this.props.game.time_to_think}
                    cbTimeout={this.props.cbStopwatchTimeout} />
              </span>
            </div>
            <div className="col-lg-8">
              <span>Decision Made: </span>
              <span className="cool-number">{decisionMadeCount}</span>
            </div>
          </div>
        )
      case 'finished':
        if (this.props.winners.length === 0) {
          return <div className="text-danger text-center">Bus Company has bankrupted.. Shame on you! </div>
        } else {
          let winners_view = this.props.winners.map(w => w.name).join(', ')
          return <div className="text-success text-center">Bus company survived! Winners are: {winners_view}</div>
        }
      default:
        return {rounds: undefined, status: undefined, time: undefined}
    }
  }
})

export default CSSModules(GameInfo, styles)
