
import axiosClient from '../../../src/HttpInterceptorAxios';
import * as userActions from './Store/actions.js'
import * as errorActions from '../../common/ErrorHandler'
import Transformer from '../../utils/Transformer'



function transformRequest(parms) {
  return Transformer.send(parms)
}

function transformResponse(params) {
  return Transformer.fetch(params)
}

export function userAddRequest(params) {
  console.log('USer Add Params')
  return dispatch => (
    new Promise((resolve, reject) => {
      axiosClient.post('/users/create', transformRequest(params))
        .then(response => {
          const data = Transformer.fetch(response.data)
          console.log('Into USer :: data :: ', response)
          if(response.headers.status == 'SUCCESS'){
            dispatch(userActions.setUserDataState("USER_ADD_SUCCESS"))
            dispatch(userActions.add(params))
          } else
          {
            dispatch(userActions.setUserDataState("USER_ADD_ERROR"))
            dispatch(errorActions.setError("Error ADD USER:"))
          } 
          
          return resolve()
        })
        .catch(function (error) {
            
            if (error.response) {
              
              dispatch(errorActions.setError(error.response.data.message))
            } else if (error.request) {              
             
              dispatch(errorActions.setError(error.request))
            } else {
            
              console.log('here USER  error ::',error.message )
              dispatch(errorActions.setError(error.response.data.message))
              return reject(error.response.data);
            }
          console.log("User Error :: ", error);
          dispatch(userActions.setUserDataState("USER_ADD_ERROR"))
          })
    })
  )
}

export function userUpdateRequest(params) {
  return dispatch => (
    new Promise((resolve, reject) => {
      axiosClient.patch(`users/${params.id}`, transformRequest(params))
        .then(response => {
          const data = Transformer.fetch(response.data)
          console.log('Into Login :: data :: ', data)
          if(response.headers.status == 'SUCCESS'){
            dispatch(userActions.setUserDataState("USER_UPDATE_SUCCESS"))
            dispatch(userActions.update(params))
          } else
          {
            dispatch(userActions.setUserDataState("USER_UPDATE_ERROR"))
            dispatch(errorActions.setError("Error USER UPDATE :"))
          } 
          
          return resolve()
        })
        .catch(function (error) {
            
            if (error.response) {
             
              dispatch(errorActions.setError(error.response.data.message))
            } else if (error.request) {              
              console.log(' User error.request :::', error.request);
              dispatch(errorActions.setError(error.request))
            } else {
            
              console.log('here USER  error ::',error.message )
              dispatch(errorActions.setError(error.response.data.message))
              return reject(error.response.data);
          }
            
          console.log("User Error :: ", error);
          dispatch(userActions.setUserDataState("USER_UPDATE_ERROR"))
          })
    })
  )
}

export function userRemoveRequest(id) {
  return dispatch => {
    axiosClient.delete(`users/${id}`)
        .then(response => {
          const data = Transformer.fetch(response.data)
          if(response.headers.status == 'SUCCESS'){
            dispatch(userActions.setUserDataState("USER_REMOVE_SUCCESS"))
            dispatch(userActions.remove(id))
          } else
          {
            dispatch(userActions.setUserDataState("USER_REMOVE_ERROR"))
            dispatch(errorActions.setError("Error USER REMOVE :"))
          } 
          
          return resolve()
        })
        .catch(function (error) {
        
            if (error.response) {
              dispatch(errorActions.setError(error.response.data.message))
            } else if (error.request) {              
              dispatch(errorActions.setError(error.request))
            } else {
              dispatch(errorActions.setError(error.response.data.message))
              return reject(error.response.data);
          }
            console.log("User Error :: ", error);
            dispatch(userActions.setUserDataState("USER_REMOVE_ERROR"))
          })
  }
}

export function userListRequest({pageNumber = 1, url='user/calls'}) {
  return dispatch => {
    if (pageNumber > 1) {
      url = url + `?page=${pageNumber}`
    }
    console.log(' userListRequest  :: url ::', url)
    axiosClient.get(url)
      .then(response => {
        console.log('Response :: ', response)
        console.log('Transformer.fetch(response.data):: ', Transformer.fetch(response.data))
        console.log('response.headers.status ', response.headers.status)
          const data = Transformer.fetch(response.data)
          if(response.headers.status == 'SUCCESS'){
            dispatch(userActions.setUserDataState("USER_LIST_SUCCESS"))
            dispatch(userActions.list(transformResponse(data )))
            
          } else
          {
            dispatch(userActions.setUserDataState("USER_LIST_ERROR"))
            dispatch(errorActions.setError("Error USER LIST :"))
          } 
        })
      .catch((error) => {
        console.log("User List Error :: ", error);
        dispatch(userActions.setUserDataState("USER_LIST_ERROR"))
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

export function userEditRequest(id) {
  return dispatch => {
    axiosClient.get(`users/${id}`)   
        .then(response => {
          const data = Transformer.fetch(response.data)
          if(response.headers.status == 'SUCCESS'){
            dispatch(userActions.setUserDataState("USER_EDIT_SUCCESS"))
            dispatch(userActions.add(transformResponse(response.data)))
          } else
          {
            dispatch(userActions.setUserDataState("USER_EDIT_ERROR"))
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
            console.log("User Edit Error :: ", error);
            dispatch(userActions.setUserDataState("USER_EDIT_ERROR"))
      })
  }
}

export function userFetchRequest(slug) {
  return dispatch => {
    axiosClient.get(`user/published/${slug}`)
      .then(response => {
          const data = Transformer.fetch(response.data)
          if(response.headers.status == 'SUCCESS'){
            dispatch(userActions.setUserDataState("USER_FETCH_SUCCESS"))
            dispatch(userActions.add(transformResponse(response.data)))
          } else
          {
            dispatch(userActions.setUserDataState("USER_FETCH_ERROR"))
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
            console.log("User Edit Error :: ", error);
            dispatch(userActions.setUserDataState("USER_FETCH_ERROR"))
      })
  }
}

export function setUserDataState(status) {
  console.log(' setUserDataState UserState ::', status);
  return dispatch => {
        dispatch(userActions.setUserDataState(status))

      }   
}