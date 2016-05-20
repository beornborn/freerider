import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Username.css'
import CreateIcon from 'material-ui/svg-icons/content/create'
import Theme from '~/app/FreeriderTheme'
import { FlatButton, Dialog, TextField } from 'material-ui'
import superagent from 'superagent'
import _ from 'lodash'

let Username = React.createClass({
  PropTypes: {
    cbUpdateCurrentUser: React.PropTypes.func
  },

  contextTypes: {
    snackbarCallback: React.PropTypes.func,
    currentUser: React.PropTypes.object
  },

  getInitialState() {
    return {
      open: false,
      name: '',
      neverWasSubmitted: true
    }
  },

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.context.currentUser.name !== nextContext.currentUser.name) {
      this.setState({name: nextContext.currentUser.name})
    }
  },

  handleOpen() { this.setState({open: true}) },
  handleClose() { this.setState({open: false}) },
  handleChangeName(e) { this.setState({name: e.target.value}) },

  handleCreate() {
    this.setState({neverWasSubmitted: false})
    if (this.formValid()) {
      superagent
        .put('/users/' +this.context.currentUser.id)
        .send({ name: this.state.name })
        .set('Accept', 'application/json')
        .set('ContentType', 'application/json')
        .end((err, res) => {
          this.props.cbUpdateCurrentUser(JSON.parse(res.text))
        })
      this.handleClose()
      this.context.snackbarCallback('Name Updated')
    }
  },

  formValid() {
    return this.valuePresent(this.state.name).valid
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
    if (!this.state.neverWasSubmitted) {
      errorNameMessage = this.valuePresent(this.state.name).message
    }
    let displayName = _.truncate(this.context.currentUser.name, {length: 10})

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Update"
        secondary={true}
        onTouchTap={this.handleCreate}
      />
    ]

    return (
      <div styleName="username-container">
        <CreateIcon color={Theme.commonSettings.palette.accent4Color} onTouchTap={this.handleOpen}/>
        <span styleName="username" onTouchTap={this.handleOpen}>{displayName}</span>
        <Dialog
          title="Edit Username"
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleClose}
          contentClassName={styles.form}
          titleClassName={styles.formTitle}>
          <TextField
            defaultValue={this.context.currentUser.name}
            onChange={this.handleChangeName}
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

export default CSSModules(Username, styles)
