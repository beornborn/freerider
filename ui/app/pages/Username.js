import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Username.css'
import CreateIcon from 'material-ui/svg-icons/content/create'
import Theme from '~/app/FreeriderTheme'

let Username = React.createClass({
  contextTypes: {
    currentUser: React.PropTypes.object
  },

  render() {
    return (
      <div styleName="username-container">
        <CreateIcon color={Theme.commonSettings.palette.alternateTextColor}/>
        <span styleName="username">{this.context.currentUser.name}</span>
      </div>
    )
  }
})

export default CSSModules(Username, styles)
