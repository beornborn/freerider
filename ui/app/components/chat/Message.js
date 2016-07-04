import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Message.css'

var Message = React.createClass({
  render() {
    const { message } = this.props

    return (
      <div styleName='container'>
        <div styleName='author'>{message.user.name}:</div>
        <div styleName='content'>{message.content}</div>
      </div>
    )
  }
})

export default CSSModules(Message, styles)
