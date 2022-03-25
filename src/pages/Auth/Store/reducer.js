import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../../../HttpInterceptorAxios';

import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
  AUTH_RESET_PASSWORD,
  AUTH_TOKEN_EXPIRED,
  AUTH_TOKEN_EXPIRED_RESET,
  NOTIFICATION_ADD,
  NOTIFICATION_REMOVE,
  SET_DATA_STATE,
  FORGOT_PASSWORD_STATE,
  SET_DATA_STATE_REGISTER,
} from './action-types';


const initialState = {
  isAuthenticated: false,
  dataState: '',
  dataStateRegister: '',
  forgotPasswordState:'',
  token:'',
  tokenExpired: false,
  user: {},
  toastId:0,
};
import { setStorageValue } from '../../../common/storeDataValue'
const AuthReducer = (state = initialState, { type, payload = null }) => {
    
  switch (type) {
    case AUTH_REFRESH_TOKEN:
    case AUTH_LOGIN:
      return login(state, payload);
    case AUTH_LOGOUT:
      return logout(state);
    case AUTH_RESET_PASSWORD:
      return resetPassword(state);
    case NOTIFICATION_ADD:
      return addNotification(state, payload);
    case NOTIFICATION_REMOVE:
      return removeNotification(state, payload)
    case AUTH_TOKEN_EXPIRED:
      return authTokenExpired(state, payload)
    case AUTH_TOKEN_EXPIRED_RESET:
      return authTokenExpiredReset(state, payload)
    case SET_DATA_STATE:
      return setDataState(state, payload);
    case FORGOT_PASSWORD_STATE:
      return setForgotPasswordState(state, payload);
    case SET_DATA_STATE_REGISTER:
      return setDataStateRegister(state, payload);
    default:
      return state;
  }
};

function login(state, payload) {
  // console.log(' login payload reducer ::', payload)
  const { token, user } = payload
  axiosClient.defaults.headers['Authorization'] = `Bearer ${token}`;
  // console.log(' login payload reducer after ::');
  setStorageValue(token)
  return {
    ...state, isAuthenticated: true, user:user, token:token
  }
}

function logout(state) {
const {user,token} = state
new Promise(function(resolve)
 {
  AsyncStorage.removeItem('token');
  resolve(true);
});
  console.log('logout called ', state)
 return {
   ...state, isAuthenticated: false, user: {}, token:''
  }
}

function resetPassword(state) {
  return {
    ...state, resetPassword: true,
  }
}

function addNotification(state, toastId) {
  return { ...state, toastId: toastId }
}

function removeNotification(state, toastId) {
  return { ...state, toastId: 0}
}


function authTokenExpired(state) {
  return {
    ...state,
    tokenExpired:true
  }
}
 
function authTokenExpiredReset(state) {
  return {
    ...state,
    tokenExpired:false
  }
}
             
function setDataState(state,payload) {
  return {
    ...state,
    dataState:payload
  }
}
  
function setForgotPasswordState(state,payload) {
  return {
    ...state,
    forgotPasswordState:payload
  }
}

function setDataStateRegister(state,payload) {
  return {
    ...state,
    dataStateRegister:payload
  }
}
export default AuthReducer;