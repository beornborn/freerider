import update from 'react-addons-update'
import { createAction } from 'redux-actions'

export const USERNAME_EDIT_FORM_TOGGLE = 'freerider/dashboard/USERNAME_EDIT_FORM_TOGGLE'
export const USERNAME_EDIT_FORM_SUBMIT = 'freerider/dashboard/USERNAME_EDIT_FORM_SUBMIT'
export const REFRESH_GAMES_LIST = 'freerider/dashboard/REFRESH_GAMES_LIST'
export const REFRESH_USERS_ONLINE = 'freerider/dashboard/REFRESH_USERS_ONLINE'
export const CREATE_GAME_FORM_TOGGLE = 'freerider/dashboard/CREATE_GAME_FORM_TOGGLE'
export const CREATE_GAME_FORM_SUBMIT = 'freerider/dashboard/CREATE_GAME_FORM_SUBMIT'



const initialState = {
  usernameEdit: {open: false},
  gamesList: {games: [], changedGamesIds: []},
  usersOnline: {users: [], changedUsersIds: []},
  createGameForm: {open: false}
}

export default function reducer(state = initialState, action) {
  const p = action.payload
  switch (action.type) {
    case USERNAME_EDIT_FORM_TOGGLE:
      return update(state, {usernameEdit: {open: {$set: !state.usernameEdit.open}}})
    case REFRESH_GAMES_LIST:
      return update(state, {gamesList: {games: {$set: p.games}, changedGamesIds: {$set: p.changedGamesIds}}})
    case REFRESH_USERS_ONLINE:
      return update(state, {usersOnline: {users: {$set: p.users}, changedUsersIds: {$set: p.changedUsersIds}}})
    case CREATE_GAME_FORM_TOGGLE:
      return update(state, {createGameForm: {open: {$set: !state.createGameForm.open}}})
    case CREATE_GAME_FORM_SUBMIT, USERNAME_EDIT_FORM_SUBMIT:
      return state
    default:
      return state
  }
}
