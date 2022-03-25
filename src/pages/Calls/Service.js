
import axiosClient from '../../../src/HttpInterceptorAxios';
import * as callActions from './Store/actions.js'
import * as errorActions from '../../common/ErrorHandler'
import Transformer from '../../utils/Transformer'



function transformRequest(params) {
  return Transformer.send(params)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function callAddRequest(params) {
  // console.log('Call Add Params')
  return dispatch => (
    new Promise((resolve, reject) => {
      axiosClient.post('user/calls/add', transformRequest(params))
        .then(response => {
          const data = Transformer.fetch(response.data.data)
          // console.log('Into user call :: data :: ', response.headers)
          if(response.headers.status == 'SUCCESS'){
            dispatch(callActions.setCallDataState("CALL_ADD_SUCCESS"))
            dispatch(callActions.add(data))
          } else
          {
            dispatch(callActions.setCallDataState("CALL_ADD_ERROR"))
            dispatch(errorActions.setError("Error ADD CALL:"))
          } 
          
          return resolve()
        })
        .catch(function (error) {
            console.log('Call error.response ::: ', error.response);
            if (error.response) {
              
              dispatch(errorActions.setError(error.response.data.message))
            } else if (error.request) {              
              
              dispatch(errorActions.setError(error.request))
            } else {
            
              
              dispatch(errorActions.setError(error.response.data.message))
              return reject(error.response.data);
            }
          // console.log("Call Error :: ", error);
          dispatch(callActions.setCallDataState("CALL_ADD_ERROR"))
          })
    })
  )
}

export function callUpdateRequest(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      axiosClient.patch(`calls/${params.id}`, transformRequest(params))
        .then(response => {
          const data = Transformer.fetch(response.data)
          // console.log('Into Login :: data :: ', data)
          if(response.headers.status == 'SUCCESS'){
            dispatch(callActions.setCallDataState("CALL_UPDATE_SUCCESS"))
            dispatch(callActions.update(params))
          } else
          {
            dispatch(callActions.setCallDataState("CALL_UPDATE_ERROR"))
            dispatch(errorActions.setError("Error CALL UPDATE :"))
          } 
          
          return resolve()
        })
        .catch(function (error) {
            
            if (error.response) {
              // console.log('Call error.response ::: ', error.response);
              dispatch(errorActions.setError(error.response.data.message))
            } else if (error.request) {              
              // console.log(' Call error.request :::', error.request);
              dispatch(errorActions.setError(error.request))
            } else {
            
              // console.log('here CALL  error ::',error.message )
              dispatch(errorActions.setError(error.response.data.message))
              return reject(error.response.data);
          }
            
          // console.log("Call Error :: ", error);
          dispatch(callActions.setCallDataState("CALL_UPDATE_ERROR"))
          })
    })
  )
}

export function callRemoveRequest(id) {
  return dispatch => {
    axiosClient.delete(`calls/${id}`)
        .then(response => {
          const data = Transformer.fetch(response.data)
          if(response.headers.status == 'SUCCESS'){
            dispatch(callActions.setCallDataState("CALL_REMOVE_SUCCESS"))
            dispatch(callActions.remove(id))
          } else
          {
            dispatch(callActions.setCallDataState("CALL_REMOVE_ERROR"))
            dispatch(errorActions.setError("Error CALL REMOVE :"))
          } 
          
          return resolve()
        })
        .catch(function (error) {
            dispatch(callActions.setCallDataState("CALL_REMOVE_ERROR"))
            if (error.response) {
              dispatch(errorActions.setError(error.response.data.message))
            } else if (error.request) {              
              dispatch(errorActions.setError(error.request))
            } else {
              dispatch(errorActions.setError(error.response.data.message))
              return reject(error.response.data);
          }
            
          })
  }
}

export function callListRequest({pageNumber = 1, url='calls/list'}) {
  return dispatch => {
    if (pageNumber > 1) {
      url = url + `?page=${pageNumber}`
    }

    axiosClient.get(url)
      .then(response => {
       
          const data = Transformer.fetch(response.data)
          if(response.headers.status == 'SUCCESS'){
            dispatch(callActions.setCallDataState("CALL_LIST_SUCCESS"))
            dispatch(callActions.list(transformResponse(data )))
            
          } else
          {
            dispatch(callActions.setCallDataState("CALL_LIST_ERROR"))
            dispatch(errorActions.setError("Error CALL LIST :"))
          } 
        })
      .catch((error) => {
        // console.log("Call List Error :: ", error);
        dispatch(callActions.setCallDataState("CALL_LIST_ERROR"))
      if (error.response) {
              dispatch(errorActions.setError(error.response.data.message))
            } else if (error.request) {              
              dispatch(errorActions.setError(error.request))
            } else {
              dispatch(errorActions.setError(error.response.data.message))
              return reject(error.response.data);
          }            
      })
  }
}



export function callEditRequest(id) {
  return dispatch => {
    axiosClient.get(`calls/${id}`)   
        .then(response => {
          const data = Transformer.fetch(response.data)
          if(response.headers.status == 'SUCCESS'){
            dispatch(callActions.setCallDataState("CALL_EDIT_SUCCESS"))
            dispatch(callActions.add(transformResponse(response.data)))
          } else
          {
            dispatch(callActions.setCallDataState("CALL_EDIT_ERROR"))
            dispatch(errorActions.setError("Error EDIT LIST :"))
          } 
        })
      .catch((error) => {
      if (error.response) {
              dispatch(errorActions.setError(error.response.data.message))
            } else if (error.request) {              
              dispatch(errorActions.setError(error.request))
            } else {
              dispatch(errorActions.setError(error.response.data.message))
              return reject(error.response.data);
          }
            // console.log("Call Edit Error :: ", error);
            dispatch(callActions.setCallDataState("CALL_EDIT_ERROR"))
      })
  }
}

export function callFetchRequest(slug) {
  return dispatch => {
    axiosClient.get(`call/published/${slug}`)
      .then(response => {
          const data = Transformer.fetch(response.data)
          if(response.headers.status == 'SUCCESS'){
            dispatch(callActions.setCallDataState("CALL_FETCH_SUCCESS"))
            dispatch(callActions.add(transformResponse(response.data)))
          } else
          {
            dispatch(callActions.setCallDataState("CALL_FETCH_ERROR"))
            dispatch(errorActions.setError("Error FETCH LIST :"))
          } 
          
          return resolve()
        })
      .catch((error) => {
      if (error.response) {
              dispatch(errorActions.setError(error.response.data.message))
            } else if (error.request) {              
              dispatch(errorActions.setError(error.request))
            } else {
              dispatch(errorActions.setError(error.response.data.message))
              return reject(error.response.data);
          }
            // console.log("Call Edit Error :: ", error);
            dispatch(callActions.setCallDataState("CALL_FETCH_ERROR"))
      })
  }
}

export function setCallDataState(status) {
  // console.log(' setCallDataState CallState ::', status);
  return dispatch => {
        dispatch(callActions.setCallDataState(status))

      }   
}