import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { TOGGLE_SNACKBAR } from '~/app/reducers/Shared'
import { CREATE_GAME_FORM_TOGGLE, CREATE_GAME_FORM_SUBMIT } from '~/app/reducers/Dashboard'
import * as api from '~/app/api'
import CreateGameForm from '~/app/components/dashboard/CreateGameForm'
import { reduxForm } from 'redux-form'

const validate = (values) => {
  const errors = {}
  if (!values.name) { errors.name = 'Required' }
  if (!values.players) { errors.players = 'Required' }
  if (!values.rounds) { errors.rounds = 'Required' }
  if (!values.time) { errors.time = 'Required' }
  return errors
}

const mapStateToProps = (state) => {
  return {
    open: state.dashboard.createGameForm.open
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSnackbar: (message) => { dispatch(createAction(TOGGLE_SNACKBAR)({message})) },
    toggleForm: () => { dispatch(createAction(CREATE_GAME_FORM_TOGGLE)()) },
    onSubmit(formData) { dispatch(createAction(CREATE_GAME_FORM_SUBMIT)({formData})) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'createGame',
  validate,
  initialValues: {name: Math.round(Math.random() * 1000), players_amount: 2, rounds: 3, time_to_think: 1115}
})(CreateGameForm))
