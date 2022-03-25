// ErrorNotification.jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {View, ToastAndroid,Alert} from 'react-native'
import * as errorActions from '../common/ErrorHandler'


const ErrorNotification = ({children}) => {
const isOpen = useSelector(state => state.errorReducer.isOpen);
const error = useSelector(state => state.errorReducer.error);

const dispatch = useDispatch();

function handleClose() {
        dispatch(errorActions.hideError())
        }
        
 console.log('Error Toast should Trigger ', error)    
 return (
         <>
                 {children}
                 <View styles={{backgroundColor:'#900C3F',color:"red",  width:42,
      height:42,
      borderRadius:21,
                         marginRight: 8,
                 borderWidth:50}}>
                 {isOpen && error && (
                         
                       ToastAndroid.showWithGravityAndOffset(
      error,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      60,
      80
    )
                )
                 
                         }
                          </View>
        {handleClose()  }      
 </>
 )
}

export default ErrorNotification;
