import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { TOGGLE_SNACKBAR } from '~/app/reducers/Shared'
import { TOGGLE_FORM, CREATE_GAME } from '~/app/reducers/CreateGameForm'
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

const mapStateToProps = (state) => { return state.createGameForm }

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSnackbar: (message) => { dispatch(createAction(TOGGLE_SNACKBAR)({message})) },
    toggleForm: () => { dispatch(createAction(TOGGLE_FORM)()) },
    onSubmit(formData) { dispatch(createAction(CREATE_GAME)({formData})) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'createGame',
  validate,
  initialValues: {name: Math.round(Math.random() * 1000), players_amount: 2, rounds: 3, time_to_think: 15}
})(CreateGameForm))
