import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { REFRESH } from '~/app/reducers/UsersOnline'
import { ADD_CHANNEL_SUBSCRIPTION, REMOVE_CHANNEL_SUBSCRIPTION } from '~/app/reducers/Shared'
import UsersOnline from '~/app/pages/dashboard/users_online/UsersOnline'

const mapStateToProps = (state) => {
  return {
    cable: state.shared.cable,
    users: state.usersOnline.users,
    changedUsersIds: state.usersOnline.changedUsersIds
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSubscription: (channel, subscription) => {
      dispatch(createAction(ADD_CHANNEL_SUBSCRIPTION)({channel, subscription}))
    },
    removeSubscription: (channel) => { dispatch(createAction(REMOVE_CHANNEL_SUBSCRIPTION)({channel})) },
    refreshUsers: (data) => { dispatch(createAction(REFRESH)(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersOnline)
