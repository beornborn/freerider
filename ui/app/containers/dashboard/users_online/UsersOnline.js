import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import UsersOnline from '~/app/components/dashboard/users_online/UsersOnline'

const mapStateToProps = (state) => {
  return {
    users: state.dashboard.usersOnline.users,
    changedUsersIds: state.dashboard.usersOnline.changedUsersIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersOnline)
