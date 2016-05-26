import React from 'react'
import ReactDom from 'react-dom'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import { browserHistory } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './GameItem.css'
import AnimationMixin from '~/app/mixins/AnimationMixin'

let GameItem = React.createClass({
  mixins: [AnimationMixin],
  propTypes: {
    game: React.PropTypes.object.isRequired,
    updated: React.PropTypes.bool
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.props.updated) {
      this.animateUpdate(ReactDom.findDOMNode(this.refs.row))
    }
  },

  componentDidMount() {
    this.animateAppear(ReactDom.findDOMNode(this.refs.row))
  },

  render() {
    return (
      <TableRow styleName="game-row" ref="row" onClick={this.enterGame} hoverable={true} >
        <TableRowColumn styleName="name-column">
          {this.props.game.name}
        </TableRowColumn>
        <TableRowColumn>{this.props.game.players.length + '/' + this.props.game.players_amount}</TableRowColumn>
        <TableRowColumn>{this.props.game.rounds}</TableRowColumn>
        <TableRowColumn>{this.props.game.time_to_think}</TableRowColumn>
      </TableRow>
    )
  },

  enterGame() { browserHistory.push(`/games/${this.props.game.id}`) }
})

export default CSSModules(GameItem, styles)
