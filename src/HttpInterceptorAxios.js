import axios from 'axios';
import { store } from './AI5Store'

import { logout } from './pages/Auth/Service';
import {TOKEN_EXPIRED} from './pages/Auth/Store/action-types'
import { setStorageValue, getStorageValue } from './common/storeDataValue';


const axiosClient = axios.create();

// axiosClient.defaults.baseURL = 'http://localhost:8001/api/';
axiosClient.defaults.baseURL = 'http://10.0.2.2:8001/api/';

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  
};

//All request will wait 2.5 seconds before timeout
axiosClient.defaults.timeout = 2500;

// Override timeout for this request as it's known to take a long time
// axiosClient.get('/longRequest', {
//   timeout: 5000
// });

axiosClient.defaults.withCredentials = true;

// Add a response interceptor
axiosClient.interceptors.response.use(
  response => response,
  (error) => {   
    // console.log("Interceptor Response Handler ::: ready to redirect to next page :: ", error);
    if (error.response.status === 401) {
          logout().then(()=>
           {
            store.dispatch({type:TOKEN_EXPIRED});
           });
    }
    return Promise.reject(error);
  });

  // Add a request interceptor

axiosClient.interceptors.request.use(
   
  config => {
        
        
   // config.headers.test = 'Http Interceptor,I am only a header!';
        //  let token = getStorageValue('token');
        // // if (token) {
        //       console.log('setting Authorization Bearer Header in INterceptor ', token)
        //   config.headers['Authorization'] = `Bearer ${token}`;
        //   console.log('setting Authorization Bearer Header in INterceptor done w/o error ')
        // } 
     //   console.log(' Interceptor :: ', config)
        return config
    },
  error => {
        if(error.status==undefined || error.status==401)
        {
    //       console.log("Interceptor Request Handler ::: ready to redirect to next page :: ", error);
            LogoutService().then(()=>
           {
            store.dispatch({type:TOKEN_EXPIRED});
           });
           
        }
      Promise.reject(error)
    },  { synchronous: true }
  )

  
export default axiosClient