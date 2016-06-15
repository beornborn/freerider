import { connect } from 'react-redux'
import Username from '~/app/components/layout/Username'
import { reduxForm } from 'redux-form'
import { TOGGLE_DIALOG } from '~/app/reducers/Username'
import { TOGGLE_SNACKBAR, UPDATE_NAME } from '~/app/reducers/Shared'
import * as api from '~/app/api'
import { createAction } from 'redux-actions'

const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  return errors
}

const mapStateToProps = (state) => {
  return {
    dialogOpen: state.username.editDialog.open,
    currentUser: state.shared.currentUser,
    initialValues: {name: state.shared.currentUser.name}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUsername: (name) => { dispatch(createAction(UPDATE_NAME)({name})) },
    toggleSnackbar: (message) => { dispatch(createAction(TOGGLE_SNACKBAR)({message})) },
    toggleDialog: () => { dispatch(createAction(TOGGLE_DIALOG)()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'username',
  validate
})(Username))
