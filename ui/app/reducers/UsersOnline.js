import update from 'react-addons-update'

export const REFRESH = 'freerider/users_online/REFRESH'

const initialState = {
  users: [],
  changedUsersIds: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH:
      return update(state, {users: {$set: action.payload.users}, changedUsersIds: {$set: action.payload.changedUsersIds}})
    default:
      return state
  }
}
