import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import UsersOnline from '~/app/components/dashboard/users_online/UsersOnline'

const mapStateToProps = (state) => {
  return {
    users: state.usersOnline.users,
    changedUsersIds: state.usersOnline.changedUsersIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersOnline)
