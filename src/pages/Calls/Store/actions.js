/* ============
 * Actions for the CALL module
 * ============
 *
 * The actions that are available on the
 * CALL module.
 */

import {
  CALL_ADD,
  CALL_UPDATE,
  CALL_REMOVE,
  CALL_LIST,
  SET_CALL_DATA_STATE,
} from './action-types';

export function add(payload) {
  return {
    type: CALL_ADD,
    payload
  }
}

export function update(payload) {
  return {
    type: CALL_UPDATE,
    payload
  }
}

export function remove(payload) {
  return {
    type: CALL_REMOVE,
    payload
  }
}

export function list(payload) {
  return {
    type: CALL_LIST,
    payload
  }
}

export function setCallDataState(payload) {
  
  return {
    type: SET_CALL_DATA_STATE,
    payload
  }
}