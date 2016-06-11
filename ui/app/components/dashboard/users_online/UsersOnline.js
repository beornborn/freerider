import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './UsersOnline.css'
import UsersItem from '~/app/components/dashboard/users_online/UsersItem'
import CableMixin from '~/app/mixins/cable/UsersOnlineLogic'

var UsersOnline = React.createClass({
  mixins: [CableMixin],

  render() {
    let users = this.props.users.map(user => {
      return (<UsersItem user={user} key={user.id} updated={this.props.changedUsersIds.includes(user.id)} />)
    })

    return (
      <div>
        <div styleName="header">
          Players
          <span styleName="status"> Online</span>
        </div>
        <div>
          {users}
        </div>
      </div>
    )
  }
})

export default CSSModules(UsersOnline, styles)
