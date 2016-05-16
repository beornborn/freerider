import React from 'react'
import ReactDom from 'react-dom'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import AnimationMixin from './mixins/AnimationMixin'

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
      <TableRow className="game-list-row" ref="row" onClick={this.connectToGame} hoverable={true} >
        <TableRowColumn>
          {this.props.game.name}
          <a ref="link" rel="nofollow" data-method="post" href={`/games/${this.props.game.id}/connect`}></a>
        </TableRowColumn>
        <TableRowColumn>{this.props.game.players.length + '/' + this.props.game.players_amount}</TableRowColumn>
        <TableRowColumn>{this.props.game.rounds}</TableRowColumn>
        <TableRowColumn>{this.props.game.time_to_think}</TableRowColumn>
      </TableRow>
    )
  },

  connectToGame() {
    this.refs.link.click()
  }
})

export default GameItem