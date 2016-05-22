import React from 'react'
import { Card, CardTitle } from 'material-ui/Card'
import { Responsive, WidthProvider } from 'react-grid-layout'
const ResponsiveReactGridLayout = WidthProvider(Responsive)
import GamesList from '~/app/pages/dashboard/games_list/GamesList'
import UsersOnline from '~/app/pages/dashboard/users_online/UsersOnline'
import CreateGameForm from '~/app/pages/dashboard/CreateGameForm'

var Dashboard = React.createClass({
  propTypes: {
    cable: React.PropTypes.object
  },

  render() {
    var layouts = {lg: [
      {i: 'list', x: 2, y: 0, w: 4, h: 3, static: true},
      {i: 'users', x: 6, y: 0, w: 4, h: 3, static: true}
    ]}

    return (
      <div>
      {/*<ResponsiveReactGridLayout layouts={layouts} margin={[20, 20]}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
        <Card key={"list"} className="dashboard-card">
          <CardTitle title="Games" />
          <CreateGameForm />
          <GamesList cable={this.props.cable} />
        </Card>
        <Card key={"users"} className="dashboard-card">
          <UsersOnline cable={this.props.cable} />
        </Card>
      </ResponsiveReactGridLayout>*/}
      </div>
    )
  }
})

export default Dashboard
