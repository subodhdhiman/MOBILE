import 'react-native-gesture-handler';
import React,{useEffect,useState} from 'react';
import { store } from './src/AI5Store';
import Main from './src/Main'
import { Provider } from 'react-redux';
import { AuthProvider } from './src/context/AuthProvider';
//import Notifications from './src/services/Notifications';
import { Platform,LogBox  } from 'react-native';

export default function App() { 
 LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

return (

    <Provider store={store}>  
       
     <AuthProvider>
          <Main/>
     </AuthProvider>
        
     
    </Provider>  
         
    
  )
}




  {/* <Stack.Navigator> */}
      {/* <Stack.Screen name="LoadingScreen" component={LoadingScreen}  options={{ title: 'Loading' }} />   
      <Stack.Screen name="Register" component={Register}  options={{ title: 'Register' }}/>
      <Stack.Screen name="Login" component={Login}  options={{ title: 'Login' }}/>
      <Stack.Screen name="Dashboard" component={Home}  options={{ title: 'Dashboard' }}/>  */}
    {/* </Stack.Navigator> */}

