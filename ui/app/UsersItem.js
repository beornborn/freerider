import React from 'react'
import ReactDom from 'react-dom'
import AnimationMixin from './mixins/AnimationMixin'

let UsersItem = React.createClass({
  mixins: [AnimationMixin],
  propTypes: {
    user: React.PropTypes.object.isRequired,
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
      <div className="player-name" key={'player-name-' + this.props.user.id} ref="row">{this.props.user.name}</div>
    )
  }
})

export default UsersItem
