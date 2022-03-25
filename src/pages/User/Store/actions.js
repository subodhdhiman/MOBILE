/* ============
 * Actions for the USER module
 * ============
 *
 * The actions that are available on the
 * USER module.
 */

import {
  USER_ADD,
  USER_UPDATE,
  USER_REMOVE,
  USER_LIST,
  SET_USER_DATA_STATE,
} from './action-types';

export function add(payload) {
  return {
    type: USER_ADD,
    payload
  }
}

export function update(payload) {
  return {
    type: USER_UPDATE,
    payload
  }
}

export function remove(payload) {
  return {
    type: USER_REMOVE,
    payload
  }
}

export function list(payload) {
  return {
    type: USER_LIST,
    payload
  }
}

export function setUserDataState(payload) {
  console.log('INto User action setUserDataState ,payload ::  ', payload)
  return {
    type: SET_USER_DATA_STATE,
    payload
  }
}