import {
  CALL_ADD,
  CALL_UPDATE,
  CALL_REMOVE,
  CALL_LIST,
  SET_CALL_DATA_STATE,
} from './action-types'

const initialState = {
  currentPage: 0,
   callDataState: '',
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

const CallReducer = (state = initialState, { type, payload = null }) => {
  switch(type) {
    case CALL_ADD:
      return add(state, payload)
    case CALL_UPDATE:
      return update(state, payload)
    case CALL_REMOVE:
      return remove(state, payload)
    case CALL_LIST:
      return list(state, payload)
    case SET_CALL_DATA_STATE:
      return setCallDataState(state,payload);
    default:
      return state
  }
}

function add(state, payload) {
 // console.log('State :: Add Call------------ ', ...state.data, ' payload :: ',payload)
  const call = state.data.find((call) => (call.id === payload.id))
  if (!call) {
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

function setCallDataState(state, payload) {

  return {
    ...state,
    callDataState:payload
  }
}
export default CallReducer