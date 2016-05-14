import React from 'react'
import { AppBar } from 'material-ui'

var Layout = React.createClass({
  render() {
    return (
      <div>
        <AppBar
          title="Freerider"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        >
        </AppBar>
        {this.props.children}
      </div>
    )
  }
})

export default Layout
