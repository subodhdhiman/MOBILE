import {View, Text, Button, ActivityIndicator, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { styles } from './loginstyles';
import { useDispatch, useSelector } from 'react-redux';
import { setForgotPasswordState,sendEmailPasswordLink } from '../../Auth/Service';
import { cleanUpData,
  instantiateAbort, ResponseToast, LoadingToast
} from '../../../helpers/componentHelperFunc';
  import { Formik, } from 'formik';
import * as yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
// For Navigation
import { screens } from '../../../navigation/RouteItems'
import { SCROLLABLE_TYPE } from '@gorhom/bottom-sheet';
const Stack = createStackNavigator()


function ForgotPassword  ({navigation}) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
   const abortEffect = instantiateAbort();
  const dispatch = useDispatch();  
  const getForgotPasswordResponse = useSelector(state => {
    return state.authReducer.forgotPasswordState;
  });

  const EmailSchema = yup.object().shape({
          email: yup.string()
        .required('Please enter your email address')
        .label('Email')
        .email('Enter a valid email'), 
              })
useEffect(() => {
    
    const timer = setTimeout(() => {
    if( getForgotPasswordResponse=="SEND_EMAIL_LOADING"  )
    {
     
      setIsLoading(true)
    } else 
    {
      // console.log('BBgetForgotPasswordResponse :',getForgotPasswordResponse)
      setIsLoading(false)
      if (getForgotPasswordResponse == "SEND_EMAIL_SUCCESS") {
        Alert.alert("Email Sent", "Login to your registered mail for reset password.")
        // let sleep = ms => new Promise(resolve => setTimeout(resolve, 1500));
        navigation.navigate("LoginStack");
      }
    }
   
    }, 700);
    
    return () => {
      clearTimeout(timer)
      cleanUpData(abortEffect)
    }
  }, [getForgotPasswordResponse])
  
return (
   <View style={styles.container}>
      <View style={styles.mt}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={styles.logo}
            source={require('./../../../assets/images/loginIcon.png')}
          />
        </View>

 <Formik
        initialValues={{ email: '', password:'' }}
        onSubmit={(values, onSubmitProps) => {
              setIsLoading(true)
              dispatch(setForgotPasswordState('SEND_EMAIL_LOADING'))
              onSubmitProps.resetForm()
              dispatch(sendEmailPasswordLink(values.email))

            }
            }
        validationSchema={EmailSchema}
       >
        {({ values, handleChange, errors, handleBlur, touched, isValid, isSubmitting, handleSubmit,  }) => (
  
              <>  
                <View style={styles.flexRow}>  
          <Ionicons name="log-in-sharp" size={30} color="maroon" style={{ marginTop: 23 }} />        
            <TextInput
              name="email"
              placeholder="Email"  
              style={[styles.inputBox, styles.mtText]}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}

                  />
                  {values.email.length > 0 ?
                    errors.email ?
                      <Ionicons name="checkmark" size={30} color="gray" style={{ marginTop: 23 }} />
                      : <Ionicons name="ios-checkmark-circle-outline" size={30} color="green" style={{ marginTop: 23 }} />
                    : null
                  }
                  </View> 
                  {(errors.email && touched.email) &&
                  <Text style={styles.errorText}>{errors.email}</Text>
                }
              
         
            
                    <TouchableOpacity
                  style={[styles.loginButton, styles.mtButton,
                  { shadowColor: "red",
                    backgroundColor :   isValid? "#900C3F": "gray" 
                   
                  }
                  ]}
                  disabled={!isValid || isSubmitting}
                   
                  onPress={handleSubmit}>
          {getForgotPasswordResponse == 'LOGIN_LOADING'  && (
            <ActivityIndicator
              style={{marginRight: 18}}
              size="large"
              color="white"
            />
          )}
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
          
          
          </>  

        )}
      </Formik>
      
      </View>
    </View>
)
}





















export default  ForgotPasswordStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.ForgotPassword} component={ForgotPassword} />
    </Stack.Navigator>
  )
}

