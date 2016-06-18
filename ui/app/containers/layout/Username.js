import { connect } from 'react-redux'
import Username from '~/app/components/layout/Username'
import { reduxForm } from 'redux-form'
import { USERNAME_EDIT_TOGGLE_DIALOG } from '~/app/reducers/Dashboard'
import { TOGGLE_SNACKBAR, UPDATE_NAME } from '~/app/reducers/Shared'
import * as api from '~/app/api'
import { createAction } from 'redux-actions'
import { change } from 'redux-form'

const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  return errors
}

const mapStateToProps = (state) => {
  return {
    dialogOpen: state.dashboard.usernameEdit.open,
    currentUser: state.shared.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUsername: (name) => { dispatch(createAction(UPDATE_NAME)({name})) },
    toggleSnackbar: (message) => { dispatch(createAction(TOGGLE_SNACKBAR)({message})) },
    toggleDialog: (name,q,w) => {
      dispatch(createAction(USERNAME_EDIT_TOGGLE_DIALOG)())
      dispatch(change('username', 'name', name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'username',
  validate
})(Username))
