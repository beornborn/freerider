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
  selectField(props) {
    return <SelectField {...props}
      value={props.value}
      errorStyle={{color: '#FF3D00'}}
      hintText={props.hintText}
      errorText = {props.touched && props.error}
      onChange = {(event, index, value) => props.onChange(value)}>
      {props.content}
    </SelectField>
  },

  getSelectValues(array) {
    return array.map((i) => <MenuItem value={i} key={i} primaryText={i} />)
  },

  render() {
    const {handleSubmit} = this.props

    const playersAmounts = this.getSelectValues(_.range(2, 10))
    const roundsAmounts = this.getSelectValues(_.range(3, 10))
    const timeAmounts = this.getSelectValues([15,30,45,1115])

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
              <Field name="players_amount" hintText='Players' content={playersAmounts} component={this.selectField}/>
              <Field name="rounds" hintText='Rounds' content={roundsAmounts} component={this.selectField}/>
              <Field name="time_to_think" hintText='Time to think' content={timeAmounts} component={this.selectField}/>
            </form>
          </div>
        </Dialog>
      </div>
    )
  }
})

export default CSSModules(CreateGameForm, styles)
