import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './CreateGameForm.css'
import _ from 'lodash'
import { FloatingActionButton, FlatButton, Dialog, TextField, SelectField, MenuItem } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { browserHistory } from 'react-router'
import { Field } from 'redux-form'
import * as api from '~/app/api'

let CreateGameForm = React.createClass({
  render() {
    const {handleSubmit} = this.props

    const playersAmounts = _.range(2, 10).map((i) => <MenuItem value={i} key={i} primaryText={i} />)
    const roundsAmounts = _.range(3, 10).map((i) => <MenuItem value={i} key={i} primaryText={i} />)
    const timeAmounts = [15,30,45].map((i) => <MenuItem value={i} key={i} primaryText={i} />)

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.toggleForm}
      />,
      <FlatButton
        label="Create"
        secondary={true}
        form='create-game'
        type='submit'
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
            <form id='create-game' onSubmit={handleSubmit(this.props.onSubmit)}>
              <Field name='name' component={props =>
                <TextField {...props}
                  hintText="Name"
                  errorStyle={{color: '#FF3D00'}}
                  errorText={props.touched && props.error}
                  autoFocus/>
              }/>
              <Field name="players_amount" component={props =>
                <div>
                  <SelectField {...props}
                    value={props.value}
                    errorStyle={{color: '#FF3D00'}}
                    hintText="Players"
                    errorText = {props.touched && props.error}
                    onChange = {(event, index, value) => props.onChange(value)}>
                    {playersAmounts}
                  </SelectField>
                </div>
              }/>
              <Field name="rounds" component={props =>
                <div>
                  <SelectField {...props}
                    value={props.value}
                    errorStyle={{color: '#FF3D00'}}
                    hintText="Rounds"
                    errorText = {props.touched && props.error}
                    onChange = {(event, index, value) => props.onChange(value)}>
                    {roundsAmounts}
                  </SelectField>
                </div>
              }/>
              <Field name="time_to_think" component={props =>
                <div>
                  <SelectField {...props}
                    value={props.value}
                    errorStyle={{color: '#FF3D00'}}
                    hintText="Time to think"
                    errorText = {props.touched && props.error}
                    onChange = {(event, index, value) => props.onChange(value)}>
                    {timeAmounts}
                  </SelectField>
                </div>
              }/>
            </form>
          </div>
        </Dialog>
      </div>
    )
  }
})

export default CSSModules(CreateGameForm, styles)
