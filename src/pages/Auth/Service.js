import axiosClient from '../../HttpInterceptorAxios';
import * as authActions from './Store/actions'
import * as errorActions from '../../common/ErrorHandler'
import Transformer from '../../utils/Transformer'
import axios from 'axios'

/**
 * fetch the current logged in user
 *
 * @returns {function(*)}
 */

export function fetchUser() {
  return dispatch => {
    return axiosClient.get('auth/user')
      .then(res => {
        const data = Transformer.fetch(res.data)
        dispatch(authActions.authUser(data))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

/**
 * login user
 *
 * @param credentials
 * @returns {function(*)}
 */
export function login(credentials) {
 // console.log('Into Login :: ',credentials)
  return dispatch => (
    // axios.get('http://10.0.2.2:8001/sanctum/csrf-cookie').then(response => {
      new Promise((resolve, reject) => {
      
        axiosClient.post('auth/login', credentials)
          .then(response => {
            const data = Transformer.fetch(response.data)
            //   console.log('Into Login :: data :: ', response.data)
            // console.log(' response.headers.status ', response.headers.status );
            // console.log(response.status);
            // console.log(response.headers);
            if (response.headers.status == 'SUCCESS') {

              dispatch(authActions.setDataState("LOGIN_SUCCESS"))
              dispatch(authActions.authLogin(data.token, credentials, data.user))
             
            } else {
         
              dispatch(authActions.setDataState("LOGIN_ERROR"))
              dispatch(errorActions.setError("Error with Login data:"))
            }
          
            return resolve()
          })
          .catch(function (error) {
            dispatch(authActions.setDataState("LOGIN_ERROR"))
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
           
              // console.log(error.response.data);
              // console.log(error.response.status);
              // console.log(error.response.headers);
              dispatch(errorActions.setError(error.response.data.message))
            } else if (error.request) {
              
              console.log(' error.request :::', error.request);
              dispatch(errorActions.setError(error.request))
            } else {
              // Something happened in setting up the request that triggered an Error
              // console.log('Error', error.message);
              // console.log('here login error ::',data.error )
              // dispatch(errorActions.setError(error.response.data.message))
              return reject(data);
            }
            console.log('Error Login', error);
          })
      })
    // })
  )
}

export function register(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
     
      axiosClient.post('auth/register', Transformer.send(credentials))
        
        .then(response => {
       // console.log('response ::', response);
          const data = Transformer.fetch(response.data)
          if(response.headers.status == 'SUCCESS'){
            dispatch(authActions.setDataStateRegister("REGISTER_SUCCESS"))
          } else
          {
            dispatch(authActions.setDataStateRegister("REGISTER_ERROR"))
            dispatch(errorActions.setError("Error with REGISTRATION data:"))
          } 
          
          return resolve()
        })
        .catch(function (error) {
            dispatch(authActions.setDataStateRegister("REGISTER_ERROR"))
           //  console.log("Register Error :: ", error);
            if (error.response) {
             
              dispatch(errorActions.setError(error.response.data.message))
            } else if (error.request) {              
              console.log(' error.request :::', error.request);
              dispatch(errorActions.setError(error.request))
            } else {
            
              console.log('here register error ::',error.message )
              dispatch(errorActions.setError(error.response.data.message))
              return reject(error.response.data);
          }
          if (error.status >= 500) {
            dispatch(authActions.setDataStateRegister("REGISTER_ERROR"))
            console.log("Register Error :: ", error);
          }
           
          })
    })
  )
}

export function sendEmailPasswordLink(email) {
  return dispatch => (
    new Promise((resolve, reject) => {
    
      axiosClient.post('/forgot-password', {email:email})
        
      .then(response => {
        const data = Transformer.fetch(response.data)
        console.log('response.data::', response.headers.status)
          if(response.headers.status == 'SUCCESS'){
            dispatch(authActions.setForgotPasswordState("SEND_EMAIL_SUCCESS"))
          } else
          {
            dispatch(authActions.setForgotPasswordState("SEND_EMAIL_SUCCESS"))
            dispatch(errorActions.setError("Unable to send   Mail Id"))
          } 
          
          return resolve()
        })
        .catch(function (error) {
             dispatch(authActions.setForgotPasswordState("SEND_EMAIL_ERROR"))
             console.log("Forgot Password Error :ssssssssssssssssss: ", error);
            if (error.response) {
               dispatch(errorActions.setError(error.response.data.message))
            } else if (error.request) {              
              dispatch(errorActions.setError(error.request))
            } else {
              dispatch(errorActions.setError(error.response.data.message))
              return reject(error.response.data);
          }
          if (error.status >= 500) {
            // Sent some generic Server / Network Message
             dispatch(authActions.setForgotPasswordState("SEND_EMAIL_ERROR"))
            console.log("Register Error :: ", error);
          }
           
          })
    })
  )
}

/**
 * logout user
 *
 * @returns {function(*)}
 */
export function logout() {
  return dispatch => {
    return axiosClient.post('auth/logout')
      .then(() => {
        dispatch(authActions.authLogout())
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function setDataState(status) {
  return dispatch => {
        dispatch(authActions.setDataState(status))

      }   
}

export function setDataStateRegister(status) {
  return dispatch => {
        dispatch(authActions.setDataStateRegister(status))

      }   
}
export function setForgotPasswordState(status) {
  return dispatch => {
        dispatch(authActions.setForgotPasswordState(status))

      }   
}

export function authTokenExpired() {
  return dispatch => {
        dispatch(authActions.authTokenExpired())

      }   
}

export function authTokenExpiredReset() {
  return dispatch => {
        dispatch(authActions.authTokenExpiredReset())

      }   
}


// Notification Logic Here

export function addNotification() {
  return dispatch => {
        dispatch(authActions.addNotification())

      }   
}

export function removeNotification() {
  return dispatch => {
        dispatch(authActions.removeNotification())

      }        
}