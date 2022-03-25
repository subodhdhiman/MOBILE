import React, {createContext, useEffect, useState, useContext } from 'react';
import {Alert,} from 'react-native'
import axios from 'axios';

// import PushNotification from 'react-native-push-notification';
axios.defaults.withCredentials = true;

// Create a context
const AuthContext = createContext({});
export const useAuthContext = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  
  // const [user, setUser] = useState( { token: "",id: "", name: "",username: "",email: "", avatar: ""  })
  const [user, setUser] = useState()
  const [calldata, setCallData] = useState()
  const [error, setError] = useState(null)
  const [signedIn, setSignedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  

  // Create Channel for communication
  // const createChannels = () => {
  // PushNotification.createChannel(
  //     {
  //       channelId: "AI5CHANNEL",
  //       channelName: "AI5 CHANNEL WORKING..."
  //     }
  //   )
  //   console.log(' Define CHNNEL')
  // }
  //

 
  const login = (email, password) => {
    console.log('Signing In');
    setIsLoading(true);
    setSignedIn(false);
      axios.get('http://10.0.2.2:8001/sanctum/csrf-cookie').then(response => {
      
      axios.post('http://10.0.2.2:8001/api/login', {
        email,
        password,
        device_name: 'mobile'
      })
        .then(response => {
       
        const userResponse = {
          token: response.data.token,
          id: response.data.user.id,
          name: response.data.user.name,
          username: response.data.user.username,
          email: response.data.user.email,
          avatar: response.data.user.avatar,
          }
           setUser(userResponse);
            setSignedIn(true)
             setError(null);
            setIsLoading(false) 
            console.log(' user data userResponse ', userResponse )  
          
          setStorageValue(response.data.token)
          .then(response => {
              console.log('Storing into local response :  ');
        })
            .catch(error => {
          setError(error.response.data.message)
          console.log('Login error response is :  :', error);
        } )
          // setSignedIn(true)
  
      })
      .catch(error => {
        console.log('Login error : ', error.response.data.message);
        setError(error.response.data.message)
        setIsLoading(false)
      })
    })
  }
         
    const logout = () => {
      console.log('Logout----------------return ing ');
      setSignedIn(false);
      setUser(null)
      
     
      // axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      // axios.post('http://10.0.2.2:8001/api/logout')
      //   .then(response => {   
      //     setError(null);
      //     setIsLoading(false)
      //     setStorageValue({ token: "",id: "", name: "",username: "",email: "", avatar: ""  })
      //       .then(response => {
      //         console.log('Logging Out  ');
      //           })
      //           .catch(error => {
      //             console.log('Login ou Error while cleaning', error);
                  
      //           } )
      //         })
      //   .catch(error => {
      //     console.log('Login error', error.response);
       //  const  key = Object.keys(error.response.data.errors)[0];
      //     setError(error.response.data.errors[key][0])
      //     setIsLoading(false)
         
      // }) 
    } 

  return (
    <AuthContext.Provider value={{
      user, error, setUser, setError, setIsLoading, login, logout,
      signedIn, setSignedIn, calldata, setCallData
    }}>
      {children}
    </AuthContext.Provider>
  ); 
};

export { AuthContext, AuthProvider };