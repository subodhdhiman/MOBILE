
/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import {

  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
  AUTH_RESET_PASSWORD,
  AUTH_USER,

  AUTH_TOKEN_EXPIRED,
  AUTH_TOKEN_EXPIRED_RESET,
  NOTIFICATION_ADD,
  NOTIFICATION_REMOVE,
  SET_DATA_STATE,
  FORGOT_PASSWORD_STATE,
  SET_DATA_STATE_REGISTER,

} from './action-types';

export function authLogin(token, credentials,user) {

  return {
    type: AUTH_LOGIN,
    payload :{
      token:token,
      credentials: credentials,
      user, user
    },
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  }
}

export function authRefreshToken(payload) {
  return {
    type: AUTH_REFRESH_TOKEN,
    payload
  }
}

export function authResetPassword() {
  return {
    type: AUTH_RESET_PASSWORD,
  }
}

export function authUser(payload) {
  return {
    type: AUTH_USER,
    payload
  }
}


export function authTokenExpired(payload) {
  return {
    type: AUTH_TOKEN_EXPIRED,
    payload
  }
}
 
export function authTokenExpiredReset(payload) {
  return {
    type: AUTH_TOKEN_EXPIRED_RESET,
    payload
  }
}

export function addNotification(payload) {
  return  {  
      type: NOTIFICATION_ADD,
      payload
}
}
export function removeNotification(payload) {
  return  {  
      type: NOTIFICATION_REMOVE,
      payload
  }
}
 
export function setDataState(payload) {
  return {
    type: SET_DATA_STATE,
    payload
  }
}

export function setForgotPasswordState(payload) {
  return {
    type: FORGOT_PASSWORD_STATE,
    payload
  }
}
export function setDataStateRegister(payload) {
  return {
    type: SET_DATA_STATE_REGISTER,
    payload
  }
}