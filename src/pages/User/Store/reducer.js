import {
  USER_ADD,
  USER_UPDATE,
  USER_REMOVE,
  USER_LIST,
  SET_USER_DATA_STATE,
} from './action-types'

const initialState = {
  userDataState: '',
  currentPage: 0,
  data: [],
  from: 0,
  lastPage: 0,
  nextPageUrl: '',
  path: '',
  perPage: 0,
  prevPageUrl: null,
  to: 0,
  total: 0,
}

const UserReducer = (state = initialState, { type, payload = null }) => {
  switch(type) {
    case USER_ADD:
      return add(state, payload)
    case USER_UPDATE:
      return update(state, payload)
    case USER_REMOVE:
      return remove(state, payload)
    case USER_LIST:
      return list(state, payload)
    case SET_USER_DATA_STATE:
      return setUserDataState(state,payload);
    default:
      return state
  }
}

function add(state, payload) {
  const user = state.data.find((user) => (user.id === payload.id))
  if (!user) {
    const data = [...state.data, payload]
    return Object.assign({}, state, { data })
  }
  return update(state, payload)
}

function update(state, payload) {
  const data = state.data.map(obj => {
    if (obj.id === payload.id) {
      return { ...obj, ...payload }
    }
    return obj
  })

  return Object.assign({}, state, { data })
}

function remove(state, id) {
  const data = state.data.filter(obj => obj.id !== id)

  return Object.assign({}, state, { data })
}

function list(state, payload) {
  state = Object.assign({}, payload)

  return state
}

function setUserDataState(state, payload) {
  console.log(' setUserDataState : payload ',payload)
  return {
    ...state,
    userDataState:payload
  }
}
export default UserReducer