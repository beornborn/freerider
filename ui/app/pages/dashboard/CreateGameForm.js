import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './CreateGameForm.css'
import _ from 'lodash'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { TOGGLE_SNACKBAR } from '~/app/reducers/Shared'
import { TOGGLE_FORM, CHANGE_NAME, CHANGE_PLAYERS, CHANGE_ROUNDS, CHANGE_TIME, FORM_ALREADY_WAS_SUBMITTED } from '~/app/reducers/CreateGameForm'
import * as api from '~/app/api'
import { FloatingActionButton, FlatButton, Dialog, TextField, SelectField, MenuItem } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { browserHistory } from 'react-router'

let CreateGameForm = React.createClass({
  handleCreate() {
    this.props.submitForm()
    if (this.formValid()) {
      api.createGame(this.props.name, this.props.players, this.props.rounds, this.props.time)
      this.props.toggleForm()
      this.props.toggleSnackbar('Game created')
      browserHistory.push('/game')
    }
  },

  formValid() {
    return this.valuePresent(this.props.name).valid &&
      this.valuePresent(this.props.players).valid &&
      this.valuePresent(this.props.rounds).valid &&
      this.valuePresent(this.props.time).valid
  },

  valuePresent(val) {
    let result = {valid: !!_.trim(val)}
    if (!result.valid) {
      result.message = 'This field is required'
    }
    return result
  },

  render() {
    const playersAmounts = _.range(2, 10).map((i) => <MenuItem value={i} key={i} primaryText={i} />)
    const roundsAmounts = _.range(3, 10).map((i) => <MenuItem value={i} key={i} primaryText={i} />)
    const timeAmounts = [15,30,45].map((i) => <MenuItem value={i} key={i} primaryText={i} />)

    let errorStyle = {color: '#FF3D00'}
    let errorNameMessage, errorPlayersMessage, errorRoundsMessage, errorTimeMessage
    if (!this.props.formNeverWasSubmitted) {
      errorNameMessage = this.valuePresent(this.props.name).message
      errorPlayersMessage = this.valuePresent(this.props.players).message
      errorRoundsMessage = this.valuePresent(this.props.rounds).message
      errorTimeMessage = this.valuePresent(this.props.time).message
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.toggleForm}
      />,
      <FlatButton
        label="Create"
        secondary={true}
        onTouchTap={this.handleCreate}
      />
    ]

    return (
      <div styleName="button-container">
        <FloatingActionButton secondary={true} styleName="new-game-button" onTouchTap={this.props.toggleForm}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="New Game"
          open={this.props.open}
          actions={actions}
          onRequestClose={this.props.toggleForm}
          contentClassName={styles.form}
          titleClassName={styles.title}>
          <div>
            <TextField
              defaultValue={this.props.name}
              onChange={this.props.changeName}
              hintText="Name"
              floatingLabelText="Name of your game"
              errorText={errorNameMessage}
              errorStyle={errorStyle}
              autoFocus/>
            <SelectField
              value={this.props.players || 2}
              onChange={this.props.changePlayers}
              errorText={errorPlayersMessage}
              errorStyle={errorStyle}
              hintText="Players amount">
              {playersAmounts}
            </SelectField>
            <SelectField
              value={this.props.rounds || 3}
              onChange={this.props.changeRounds}
              errorText={errorRoundsMessage}
              errorStyle={errorStyle}
              hintText="Rounds amount">
              {roundsAmounts}
            </SelectField>
            <SelectField
              value={this.props.time || 15}
              onChange={this.props.changeTime}
              errorText={errorTimeMessage}
              errorStyle={errorStyle}
              hintText="Time to think">
              {timeAmounts}
            </SelectField>
          </div>
        </Dialog>
      </div>
    )
  }
})

const mapStateToProps = (state) => { return state.createGameForm }

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSnackbar: (message) => { dispatch(createAction(TOGGLE_SNACKBAR)({message})) },
    toggleForm: () => { dispatch(createAction(TOGGLE_FORM)()) },
    changeName: (e) => { dispatch(createAction(CHANGE_NAME)({name: e.target.value}))},
    changePlayers: (_, __, players) => { dispatch(createAction(CHANGE_PLAYERS)({players}))},
    changeRounds: (_, __, rounds) => { dispatch(createAction(CHANGE_ROUNDS)({rounds}))},
    changeTime: (_, __, time) => { dispatch(createAction(CHANGE_TIME)({time}))},
    submitForm: ()  => { dispatch(createAction(FORM_ALREADY_WAS_SUBMITTED)())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(CreateGameForm, styles))
