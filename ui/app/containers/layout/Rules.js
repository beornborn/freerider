import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Rules.css'
import { FlatButton, Dialog, Divider } from 'material-ui'
import { connect } from 'react-redux'
import { TOGGLE_RULES } from '~/app/reducers/Shared'
import { createAction } from 'redux-actions'

let Rules = React.createClass({
  render() {
    const actions = [
      <FlatButton
        label="Got It"
        primary={true}
        onTouchTap={this.props.toggleDialog}
      />
    ]

    return (
      <div>
        {this.props.children}
        <Dialog
          title="Rules"
          open={this.props.open}
          actions={actions}
          onRequestClose={this.props.toggleDialog}
          titleClassName={styles.title}>
          <div>
            <ol>
              <li> You and other people use public transport, for example a bus.
              </li>
              <li> To stay in business a bus company needs to have at least 1 passenger buying a ticket during 1 trip.
              </li>
              <li> Each round of the game is a trip. You decide to buy a ticket or steal a ride thinking that someone else will buy it.
              </li>
              <li> If everyone appears to be such a smartass, company goes bankrupt. Everyone loses public commute, that means everyone loses.
              </li>
              <li> Our society adores successful smartasses, so if company survives, winner is the passenger who stole most rides.
              </li>
            </ol>
            <Divider />
            <ol>
              <li> Вы и другие люди пользуетесь общественным транспортом, скажем, автобусом.
              </li>
              <li> Автобусная компания не должна обанкротиться. Для этого нужно, чтобы хотя бы один пассажир за поездку купил билет.
              </li>
              <li>
                | Каждый раунд игры - это поездка.
                br
                | Вы решаете покупать билет или быть хитрожопым и проехать зайцем в надежде, что кто-то другой купит.
              </li>
              <li>
                | Если хитрожопыми окажутся все, и автобусная компания обанкротится.
                br
                | Все останутся без автобусов вообще, то есть все проиграют.
              </li>
              <li> А еще у нас в обществе почет халявщикам, так что если автобусная компания выживет, то побеждает тот, кто схитрожопил больше :)
              </li>
            </ol>
          </div>
        </Dialog>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {open: state.shared.rules.open}
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDialog: () => { dispatch(createAction(TOGGLE_RULES)()) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Rules, styles))
