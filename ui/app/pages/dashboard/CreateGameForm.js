import React from 'react'
import ReactDom from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from './CreateGameForm.css'
import _ from 'lodash'

import { FloatingActionButton, FlatButton, Dialog, TextField, SelectField, MenuItem } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'

let CreateGameForm = React.createClass({
  getInitialState() {
    return {
      open: false,
      name: '',
      players: undefined,
      rounds: undefined,
      time: undefined,
      neverWasSubmitted: true
    }
  },

  handleOpen() { this.setState({open: true}) },
  handleClose() { this.setState({open: false}) },

  handleCreate() {
    this.setState({neverWasSubmitted: false})
    this.validate()
  },

  validate() {
    if (this.valuePresent(this.state.name).valid) {}
  },

  valuePresent(val) {
    let result = {valid: !!_.trim(val)}
    if (!result.valid) {
      result.message = 'This field is required'
    }
    return result
  },

  handleChangeName(e) { this.setState({name: e.target.value}) },
  handleChangePlayers(_, __, value) { this.setState({players: value}) },
  handleChangeRounds(_, __, value) { this.setState({rounds: value}) },
  handleChangeTime(_, __, value) { this.setState({time: value}) },

  render() {
    const playersAmounts = _.range(2, 10).map((i) => <MenuItem value={i} key={i} primaryText={i} />)
    const roundsAmounts = _.range(3, 10).map((i) => <MenuItem value={i} key={i} primaryText={i} />)
    const timeAmounts = [15,30,45].map((i) => <MenuItem value={i} key={i} primaryText={i} />)

    let errorStyle = {color: '#FF3D00'}
    let errorNameMessage, errorPlayersMessage, errorRoundsMessage, errorTimeMessage
    if (!this.state.neverWasSubmitted) {
      errorNameMessage = this.valuePresent(this.state.name).message
      errorPlayersMessage = this.valuePresent(this.state.players).message
      errorRoundsMessage = this.valuePresent(this.state.rounds).message
      errorTimeMessage = this.valuePresent(this.state.time).message
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Create"
        secondary={true}
        onTouchTap={this.handleCreate}
      />
    ]

    return (
      <div>
        <FloatingActionButton secondary={true} styleName="new-game-button" onTouchTap={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="New Game"
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleClose}
          contentClassName={styles.form}
          titleClassName={styles.title}>
          <div>
            <TextField
              onChange={this.handleChangeName}
              hintText="Name"
              floatingLabelText="Name of your game"
              errorText={errorNameMessage}
              errorStyle={errorStyle}
              autoFocus/>
            <SelectField
              value={this.state.players}
              onChange={this.handleChangePlayers}
              errorText={errorPlayersMessage}
              errorStyle={errorStyle}
              hintText="Players amount">
              {playersAmounts}
            </SelectField>
            <SelectField
              value={this.state.rounds}
              onChange={this.handleChangeRounds}
              errorText={errorRoundsMessage}
              errorStyle={errorStyle}
              hintText="Rounds amount">
              {roundsAmounts}
            </SelectField>
            <SelectField
              value={this.state.time}
              onChange={this.handleChangeTime}
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

export default CSSModules(CreateGameForm, styles)
