import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Chat.css'
import Message from '~/app/components/chat/Message'
import { TextField, RaisedButton } from 'material-ui'
import { Field } from 'redux-form'
import CableMixin from '~/app/mixins/cable/ChatLogic'

var Chat = React.createClass({
  mixins: [CableMixin],

  textField(props) {
    return <TextField floatingLabelText='Message' {...props} className={styles.input}/>
  },

  render() {
    const { handleSubmit, pristine, submitting, chat } = this.props

    return <div styleName='container'>
      <div styleName='messages'>
        {chat.messages.map(message =>
          <Message message={message} key={message.id}/>
        )}
      </div>
      <form onSubmit={handleSubmit(this.props.onSubmit)}>
        <div styleName='form'>
          <Field name='content' component={this.textField}/>
          <RaisedButton label='Say' primary={true} styleName='say' type='submit' disabled={pristine || submitting} />
        </div>
      </form>
    </div>
  }
})

export default CSSModules(Chat, styles)
