import React from 'react'
import Paper from 'material-ui/Paper'
import UsersOnline from './UsersOnline'
import GamesList from './GamesList'
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

var Dashboard = React.createClass({
  propTypes: {
    cable: React.PropTypes.object
  },

  render() {
    var layouts = {lg: [
          {i: 'form', x: 1, y: 0, w: 7, h: 2, static: true},
          {i: 'games', x: 1, y: 2, w: 7, h: 5, static: true},
          {i: 'users', x: 8, y: 0, w: 3, h: 7, static: true}
        ]}
        console.log(' render dashboard')
    return (
      <ResponsiveReactGridLayout className="layout" layouts={layouts} margin={[20, 20]}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
        <Paper key={"form"}>
          1
        </Paper>
        <Paper key={"games"}>
          <GamesList cable={this.props.cable} />
        </Paper>
        <Paper key={"users"}>
          <UsersOnline cable={this.props.cable} />
        </Paper>
      </ResponsiveReactGridLayout>
    )
  }
})

export default Dashboard
