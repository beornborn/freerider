import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Username.css'
import CreateIcon from 'material-ui/svg-icons/content/create'
import Theme from '~/app/FreeriderTheme'
import { FlatButton, Dialog, TextField } from 'material-ui'
import axios from 'axios'
import { connect } from 'react-redux'
import _ from 'lodash'
import { updateUsername, CHANGE_NAME, TOGGLE_DIALOG, FORM_ALREADY_WAS_SUBMITTED } from '~/app/reducers/Username'
import { TOGGLE_SNACKBAR } from '~/app/reducers/Shared'
import { createAction } from 'redux-actions'

let Username = React.createClass({
  handleSubmitForm() {
    this.props.submitForm()
    if (this.formValid()) {
      this.props.updateUsername(this.props.currentUser.id, this.props.name)
      this.props.toggleDialog()
      this.props.toggleSnackbar('Username Updated')
    }
  },

  formValid() {
    return this.valuePresent(this.props.name).valid
  },

  valuePresent(val) {
    let result = {valid: !!_.trim(val)}
    if (!result.valid) {
      result.message = 'This field is required'
    }
    return result
  },

  render() {
    let errorStyle = {color: '#FF3D00'}
    let errorNameMessage
    if (!this.props.formNeverWasSubmitted) {
      errorNameMessage = this.valuePresent(this.props.name).message
    }
    let displayName = _.truncate(this.props.currentUser.name, {length: 10})

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.toggleDialog}
      />,
      <FlatButton
        label="Update"
        secondary={true}
        onTouchTap={this.handleSubmitForm}
      />
    ]

    return (
      <div styleName="username-container">
        <CreateIcon color={Theme.commonSettings.palette.accent4Color} onTouchTap={this.props.toggleDialog}/>
        <span styleName="username" onTouchTap={this.props.toggleDialog}>{displayName}</span>
        <Dialog
          title="Edit Username"
          open={this.props.dialogOpen}
          actions={actions}
          onRequestClose={this.props.toggleDialog}
          contentClassName={styles.form}
          titleClassName={styles.formTitle}>
          <TextField
            defaultValue={this.props.currentUser.name}
            onChange={this.props.handleChangeName}
            hintText="John Dow"
            floatingLabelText="Your Name"
            errorText={errorNameMessage}
            errorStyle={errorStyle}
            autoFocus/>
        </Dialog>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    dialogOpen: state.username.editDialog.open,
    formNeverWasSubmitted: state.username.editDialog.formNeverWasSubmitted,
    name: state.username.name,
    currentUser: state.shared.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUsername: (userId, name) => { updateUsername(dispatch, userId, name) },
    submitForm: () => { dispatch(createAction(FORM_ALREADY_WAS_SUBMITTED)()) },
    toggleSnackbar: (message) => { dispatch(createAction(TOGGLE_SNACKBAR)({message})) },
    toggleDialog: () => { dispatch(createAction(TOGGLE_DIALOG)()) },
    handleChangeName: (e) => { dispatch(createAction(CHANGE_NAME)({name: e.target.value})) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Username, styles))
