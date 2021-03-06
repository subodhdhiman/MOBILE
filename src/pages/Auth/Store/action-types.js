// auth action types

export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const AUTH_REFRESH_TOKEN = 'AUTH_REFRESH_TOKEN'
export const AUTH_RESET_PASSWORD = 'AUTH_RESET_PASSWORD'
export const AUTH_USER = 'AUTH_USER'
export const AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED';
export const AUTH_TOKEN_EXPIRED_RESET = 'AUTH_TOKEN_EXPIRED_RESET';
export const SET_DATA_STATE = 'SET_DATA_STATE'
export const SET_DATA_STATE_REGISTER = 'SET_DATA_STATE_REGISTER'
export const FORGOT_PASSWORD_STATE = 'FORGOT_PASSWORD_STATE'
// Set Global Notification
export const NOTIFICATION_ADD= 'NOTIFICATION_ADD'
export const NOTIFICATION_REMOVE= 'NOTIFICATION_REMOVE'


export default {

  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
  AUTH_RESET_PASSWORD,
  AUTH_USER,
  AUTH_REFRESH_TOKEN,
  AUTH_TOKEN_EXPIRED,
  AUTH_TOKEN_EXPIRED_RESET,
  NOTIFICATION_ADD,
  NOTIFICATION_REMOVE,
  SET_DATA_STATE,
  SET_DATA_STATE_REGISTER,
  FORGOT_PASSWORD_STATE,
}