import { connect } from 'react-redux'
import { UPDATE_CURRENT_USER, TOGGLE_DROWER, TOGGLE_SNACKBAR, TOGGLE_RULES,
  ADD_CHANNEL_SUBSCRIPTION_WHEN_READY, REMOVE_CHANNEL_SUBSCRIPTION } from '~/app/reducers/Shared'
import { REFRESH_USERS_ONLINE } from '~/app/reducers/Dashboard'
import { createAction } from 'redux-actions'
import * as api from '~/app/api'
import Layout from '~/app/components/layout/Layout'
import { browserHistory } from 'react-router'

var mapStateToProps = (state) => {return {
  drowerOpen: state.shared.drower.open,
  snackbarOpen: state.shared.snackbar.open,
  snackbarMessage: state.shared.snackbar.message,
  currentUserLoaded: state.shared.currentUserLoaded,
  cable: state.shared.cable
}}

var mapDispatchToProps = (dispatch) => {
  return {
    toggleDrower: () => { dispatch(createAction(TOGGLE_DROWER)()) },
    toggleSnackbar: () => { dispatch(createAction(TOGGLE_SNACKBAR)({message: ''})) },
    toggleRules: () => { dispatch(createAction(TOGGLE_RULES)()) },
    updateCurrentUser: (currentUser) => { dispatch(createAction(UPDATE_CURRENT_USER)({currentUser}))},
    connectedToGame: () => {
      dispatch(createAction(TOGGLE_SNACKBAR)({message: 'Connected to the game'}))
      browserHistory.push('/game')
    },
    addSubscription: (channel, settings) => {
      dispatch(createAction(ADD_CHANNEL_SUBSCRIPTION_WHEN_READY)({channel, settings}))
    },
    removeSubscription: (channel) => { dispatch(createAction(REMOVE_CHANNEL_SUBSCRIPTION)({channel})) },
    updateUsersOnline: (users) => { dispatch(createAction(REFRESH_USERS_ONLINE)({users, changedUsersIds: []})) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout)
