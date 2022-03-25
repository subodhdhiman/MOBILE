import React, {useContext, useEffect, useState,useCallback} from 'react';

import { createStackNavigator } from '@react-navigation/stack'
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Button, ActivityIndicator, Image, TextInput, TouchableOpacity }
  from 'react-native';
import { styles } from './loginstyles';
import { useDispatch, useSelector } from 'react-redux';
import { setStorageValue, getStorageValue } from '../../../common/storeDataValue'
import { login, setDataState} from '../../Auth/Service';
import { cleanUpData,
  instantiateAbort,ResponseToast,LoadingToast } from '../../../helpers/componentHelperFunc';
import { Formik, } from 'formik';
import * as yup from 'yup';
// Import vector icons
import Ionicons from 'react-native-vector-icons/Ionicons';


// For Navigation
import { screens } from '../../../navigation/RouteItems'

const Stack = createStackNavigator()

const SignUpSchema = yup.object().shape({
          email: yup.string()
        .required('Please enter your email address')
        .label('Email')
        .email('Enter a valid email'), 
        password: yup.string()
         .required("Please Enter your password")
      .min(5, "Your password must be longer than 5 characters.")
      .max(25)
      // .matches(/^(?=.{6,})/, "Must Contain 6 Characters")
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])/,
      //   "Must Contain One Uppercase, One Lowercase"
      //    )
      // .matches(
      //   /^(?=.*[!@#\$%\^&\*])/,
      //   "Must Contain One Special Case Character"
      //   )
      // .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number"),
        })

function Login({ navigation}) {
 
  const abortEffect = instantiateAbort();
  const dispatch = useDispatch();   
 
  const [visible, setVisible] = useState(false);
  const loginResponse = useSelector(state => {
   console.log('State::::::::: ', state);
    return state.authReducer.dataState;
  });
  const token = useSelector(state => {
    return state.authReducer.token;
  });

  
function removeToken() {
return new Promise(function(resolve)
 {
  AsyncStorage.removeItem('token');
  resolve(true);
  });
}

      /**
  * called once for setting the initial State
  */

  useEffect(() => {

    const timer = setTimeout(() => {
    if(loginResponse!="" || loginResponse=="LOGIN_LOADING" || token == "" )
    {
      LoadingToast("top","please wait..","success");
    }
    
    if (loginResponse == "LOGIN_SUCCESS" ) {
       
      navigation.navigate("DashboardStack");
    }
    if(loginResponse === "LOGIN_ERROR")
    {
      // First Set token to null
         // removeToken();
          if(typeof loginResponse === "string")
          {
            ResponseToast("top","Close","danger",loginResponse,6000);
            
          }else if(typeof loginResponse === "object")
          {
            Object.keys(loginResponse).map((keys,index)=>{
        
              ResponseToast("top","Close","danger",loginResponse[keys][0],6000);
            })
          }
      }
     }, 500);
    
    return () => {
      clearTimeout(timer)
      cleanUpData(abortEffect)
    }
  }, [loginResponse])

  return (
   <View style={styles.container}>
      <View style={styles.mt}>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Image
            style={styles.logo}
            source={require('./../../../assets/images/loginIcon.png')}
          />
           </View>
    
         <View style={{marginTop: 10}}>
      <Formik
        initialValues={{ email: '', password:'' }}
            onSubmit={(values, onSubmitProps) => {
            //  console.log('onSubmit :', onSubmitProps)
              onSubmitProps.setSubmitting(false)
              dispatch(setDataState("LOGIN_LOADING"))
              onSubmitProps.resetForm()
              dispatch(login(values))
              
            }
            }
        validationSchema={SignUpSchema}
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
                <View style={styles.flexRow}>  
                  <Ionicons name="lock-closed-sharp" size={30} color="maroon" style={{ marginTop: 23 }} /> 
            <TextInput
              name="password"
              placeholder="Password"      
              style={[styles.inputBox, styles.mtText]}
              onChangeText={handleChange('password')}
              onBlur={handleBlur("password")}
              secureTextEntry={!visible}
              value={values.password} 
                  />
                  {values.password.length > 0 ?
                  visible  ?
                   <Ionicons name="eye-outline" size={30} color="green" style={{ marginTop: 23 }} 
                        onPress={() => setVisible(!visible)} />
                    :
                    <Ionicons name="eye-off-outline" size={30} color="gray" style={{ marginTop: 23 }}
                    onPress={() => setVisible(!visible)} />
                   : null }

            </View> 
            {(errors.password && touched.password) &&
                <Text style={styles.errorText}>{errors.password}</Text>
            }
                    <TouchableOpacity
                  style={[styles.loginButton, styles.mtButton,
                  { shadowColor: "red",
                    backgroundColor :   isValid? "#900C3F": "gray" 
                   
                  }
                  ]}
                  disabled={!isValid || isSubmitting}
                   
                  onPress={handleSubmit}>
          {loginResponse == 'LOGIN_LOADING'  && (
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
        <View style={[styles.forgetpassword]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordStack')}>
            <Text style={styles.registerTextLink}>Forget Password ?</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.register}>
          <Text>Don't have and account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterStack')}>
            <Text style={styles.registerTextLink}>Register</Text>
            </TouchableOpacity>
            </View>
      </View>
    </View>
 
);
} 
    

export default  LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Login} component={Login} />
    </Stack.Navigator>
  )
}
