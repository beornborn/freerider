import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Username.css'
import CreateIcon from 'material-ui/svg-icons/content/create'
import Theme from '~/app/FreeriderTheme'
import { FlatButton, Dialog, TextField } from 'material-ui'
import { Field } from 'redux-form'

let Username = React.createClass({
  onSubmit(formData) {
    this.props.updateUsername(formData.name)
    this.props.toggleDialog()
    this.props.toggleSnackbar('Username Updated')
  },

  render() {
    const {handleSubmit} = this.props

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.toggleDialog}
      />,
      <FlatButton
        label="Update"
        secondary={true}
        type='submit'
        form='username-form'
      />
    ]

    return (
      <div styleName="username-container">
        <CreateIcon color={Theme.commonSettings.palette.accent4Color} onTouchTap={this.props.toggleDialog}/>
        <span styleName="username" onTouchTap={this.props.toggleDialog}>{this.props.currentUser.name}</span>
        <Dialog
          title="Edit Username"
          open={this.props.dialogOpen}
          actions={actions}
          onRequestClose={this.props.toggleDialog}
          contentClassName={styles.form}
          titleClassName={styles.formTitle}>
          <form id='username-form' onSubmit={handleSubmit(this.onSubmit)}>
            <Field name='name' component={props =>
              <TextField {...props}
                hintText="John Dow"
                floatingLabelText="Your Name"
                errorText={props.touched && props.error}
                errorStyle={{color: '#FF3D00'}}
                autoFocus/>
            }/>
          </form>
        </Dialog>
      </div>
    )
  }
})

export default CSSModules(Username, styles)
