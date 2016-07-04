import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { SEND_MESSAGE, REFRESH_CHAT } from '~/app/reducers/Shared'
import { ADD_CHANNEL_SUBSCRIPTION_WHEN_READY, REMOVE_CHANNEL_SUBSCRIPTION } from '~/app/reducers/Shared'
import Chat from '~/app/components/chat/Chat'
import { reduxForm } from 'redux-form'

const validate = (values) => {
  const errors = {}
  if (!values.content) { errors.content = 'Required' }
  return errors
}

const mapStateToProps = (state) => {
  return {
    chat: state.shared.chat
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    formAction: (action) => { dispatch(action) },
    onSubmit: (formData) => { dispatch(createAction(SEND_MESSAGE)({formData})) },
    addSubscription: (channel, settings) => {
      dispatch(createAction(ADD_CHANNEL_SUBSCRIPTION_WHEN_READY)({channel, settings}))
    },
    removeSubscription: (channel) => { dispatch(createAction(REMOVE_CHANNEL_SUBSCRIPTION)({channel})) },
    refreshChat: (data) => { dispatch(createAction(REFRESH_CHAT)(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'chatMessage',
  validate
})(Chat))
